<?php

namespace App\Jobs;

use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\product_warehouse;
use App\Models\WooCommerceLog;
use App\Models\WooCommerceSetting;
use App\Services\WooCommerce\Client;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Throwable;

class WooCommerceStockSyncJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $timeout = 1800;
    public int $tries = 1;

    private string $progressKey;

    private int $warehouseId = 4;

    private int $batchLimit = 100;

    public function __construct(string $progressKey)
    {
        $this->progressKey = $progressKey;
    }

    public function handle(): void
    {
        set_time_limit(1800);

        $settings = WooCommerceSetting::first();

        if (! $settings) {
            $this->failJob('WooCommerce settings missing');
            return;
        }

        $client = new Client(
            (string) $settings->store_url,
            (string) $settings->consumer_key,
            (string) $settings->consumer_secret
        );

        $total = (int) Product::whereNull('deleted_at')
            ->whereNotNull('woocommerce_id')
            ->count();

        $state = [
            'total_products' => $total,
            'synced_products' => 0,
            'failed_products' => 0,
            'skipped_products' => 0,
            'processed_products' => 0,
            'percentage' => $total > 0 ? 0 : 100,
            'last_product_id' => null,
            'last_ok' => null,
            'started_at' => now()->toDateTimeString(),
            'finished_at' => null,
            'finished' => false,
            'error' => null,
        ];

        $this->saveProgress($state);

        try {
            Product::whereNull('deleted_at')
                ->whereNotNull('woocommerce_id')
                ->orderBy('id')
                ->chunkById(200, function ($products) use (
                    $client,
                    &$state
                ) {
                    $normalProducts = [];

                    foreach ($products as $product) {
                        // Services do not have stock synchronization.
                        if (($product->type ?? '') === 'is_service') {
                            $state['skipped_products']++;
                            $this->markProcessed($state, $product->id, true);
                            continue;
                        }

                        // Variable products are synchronized separately
                        // because WooCommerce variations belong to a parent.
                        if (
                            (int) ($product->is_variant ?? 0) === 1 ||
                            ($product->type ?? '') === 'is_variant'
                        ) {
                            $ok = $this->syncVariableProduct($client, $product);

                            if ($ok) {
                                $state['synced_products']++;
                            } else {
                                $state['failed_products']++;
                            }

                            $this->markProcessed($state, $product->id, $ok);
                            continue;
                        }

                        $qty = ($product->type ?? '') === 'is_combo'
                            ? $this->computeComboStockQuantity((int) $product->id)
                            : $this->computeStockQuantity((int) $product->id);

                        $normalProducts[] = [
                            'product_id' => (int) $product->id,
                            'woocommerce_id' => (int) $product->woocommerce_id,
                            'quantity' => $qty,
                            'payload' => [
                                'id' => (int) $product->woocommerce_id,
                                'manage_stock' => true,
                                'stock_quantity' => $qty,
                                'stock_status' => $qty > 0 ? 'instock' : 'outofstock',
                            ],
                        ];
                    }

                    // WooCommerce products/batch supports up to 100 updates.
                    foreach (array_chunk($normalProducts, $this->batchLimit) as $batch) {
                        $this->syncProductsBatch($client, $batch, $state);
                    }
                });

            $state['finished'] = true;
            $state['finished_at'] = now()->toDateTimeString();
            $state['percentage'] = 100;

            $this->saveProgress($state);

            $settings->last_sync_at = now();
            $settings->save();

            $this->writeLog(
                'info',
                'Stock sync completed',
                [
                    'total' => $state['total_products'],
                    'processed' => $state['processed_products'],
                    'success' => $state['synced_products'],
                    'failed' => $state['failed_products'],
                    'skipped' => $state['skipped_products'],
                ]
            );
        } catch (Throwable $e) {
            $state['finished'] = true;
            $state['finished_at'] = now()->toDateTimeString();
            $state['error'] = $e->getMessage();

            $this->saveProgress($state);

            $this->writeLog('error', 'Stock sync job failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            throw $e;
        }
    }

    /**
     * Sync simple and combo products using WooCommerce batch API.
     */
    private function syncProductsBatch(
        Client $client,
        array $batch,
        array &$state
    ): void {
        if (empty($batch)) {
            return;
        }

        $payload = [
            'update' => array_values(array_map(
                fn ($item) => $item['payload'],
                $batch
            )),
        ];

        try {
            $response = $client->post('products/batch', $payload);

            if (! $response->successful()) {
                foreach ($batch as $item) {
                    $this->recordProductFailure(
                        $item['product_id'],
                        $item['woocommerce_id'],
                        $response->status(),
                        $response->body(),
                        $state
                    );
                }

                return;
            }

            $result = $response->json();

            $updated = is_array($result['update'] ?? null)
                ? $result['update']
                : [];

            $resultsById = [];

            foreach ($updated as $item) {
                $id = (int) ($item['id'] ?? 0);

                if ($id > 0) {
                    $resultsById[$id] = $item;
                }
            }

            foreach ($batch as $item) {
                $wooId = $item['woocommerce_id'];
                $apiResult = $resultsById[$wooId] ?? null;

                if ($this->isSuccessfulBatchItem($apiResult)) {
                    $state['synced_products']++;
                    $this->markProcessed($state, $item['product_id'], true);
                } else {
                    $this->recordProductFailure(
                        $item['product_id'],
                        $wooId,
                        $response->status(),
                        $apiResult ?? $result,
                        $state
                    );
                }
            }
        } catch (Throwable $e) {
            foreach ($batch as $item) {
                $this->recordProductFailure(
                    $item['product_id'],
                    $item['woocommerce_id'],
                    null,
                    null,
                    $state,
                    $e->getMessage()
                );
            }
        }
    }

    /**
     * Sync one variable product and its variations.
     *
     * WooCommerce variation batch API is scoped to one parent product.
     */
    private function syncVariableProduct(Client $client, Product $product): bool
    {
        $parentId = (int) $product->woocommerce_id;

        if ($parentId <= 0) {
            $this->writeLog('error', 'Variable product has no WooCommerce ID', [
                'product_id' => $product->id,
            ]);

            return false;
        }

        try {
            $existingBySku = [];
            $existingByOption = [];

            // Fetch existing WooCommerce variations.
            $page = 1;

            while (true) {
                $response = $client->get(
                    "products/{$parentId}/variations",
                    [
                        'page' => $page,
                        'per_page' => 100,
                    ]
                );

                if (! $response->successful()) {
                    $this->writeLog('error', 'Failed fetching WooCommerce variations', [
                        'product_id' => $product->id,
                        'woocommerce_id' => $parentId,
                        'status' => $response->status(),
                        'body' => $response->body(),
                    ]);

                    return false;
                }

                $variations = $response->json();

                if (! is_array($variations) || empty($variations)) {
                    break;
                }

                foreach ($variations as $variation) {
                    $variationId = (int) ($variation['id'] ?? 0);

                    if ($variationId <= 0) {
                        continue;
                    }

                    $sku = trim((string) ($variation['sku'] ?? ''));

                    if ($sku !== '') {
                        $existingBySku[$sku] = $variationId;
                    }

                    $attributes = $variation['attributes'] ?? [];

                    if (
                        is_array($attributes) &&
                        isset($attributes[0]['option'])
                    ) {
                        $option = trim((string) $attributes[0]['option']);

                        if ($option !== '') {
                            $existingByOption[$option] = $variationId;
                        }
                    }
                }

                if (count($variations) < 100) {
                    break;
                }

                $page++;
            }

            $variants = ProductVariant::where('product_id', $product->id)
                ->whereNull('deleted_at')
                ->get();

            $updates = [];
            $creates = [];
            $anyInStock = false;

            foreach ($variants as $variant) {
                $name = trim((string) ($variant->name ?? ''));

                $sku = trim((string) ($variant->code ?? ''));

                if ($sku === '') {
                    $sku = $product->code
                        ? $product->code.'-'.($name !== '' ? $name : $variant->id)
                        : 'VAR-'.$variant->id;
                }

                $quantity = $this->computeVariantStockQuantity(
                    (int) $product->id,
                    (int) $variant->id
                );

                if ($quantity > 0) {
                    $anyInStock = true;
                }

                $payload = [
                    'sku' => $sku,
                    'manage_stock' => true,
                    'stock_quantity' => $quantity,
                    'stock_status' => $quantity > 0 ? 'instock' : 'outofstock',
                    'attributes' => [
                        [
                            'name' => 'Variant',
                            'option' => $name !== '' ? $name : 'Variant '.$variant->id,
                        ],
                    ],
                ];

                $existingId = $existingBySku[$sku]
                    ?? $existingByOption[$name]
                    ?? null;

                if ($existingId) {
                    $payload['id'] = (int) $existingId;
                    $updates[] = $payload;
                } else {
                    $creates[] = $payload;
                }
            }

            // Send variation updates/creates in batches of 100.
            foreach (array_chunk($updates, $this->batchLimit) as $chunk) {
                $response = $client->post(
                    "products/{$parentId}/variations/batch",
                    ['update' => array_values($chunk)]
                );

                if (! $response->successful()) {
                    $this->writeLog('error', 'Variation batch update failed', [
                        'product_id' => $product->id,
                        'woocommerce_id' => $parentId,
                        'status' => $response->status(),
                        'body' => $response->body(),
                    ]);

                    return false;
                }

                if (! $this->batchResponseHasNoErrors($response->json(), 'update')) {
                    $this->writeLog('error', 'One or more variation updates failed', [
                        'product_id' => $product->id,
                        'woocommerce_id' => $parentId,
                        'response' => $response->json(),
                    ]);

                    return false;
                }
            }

            foreach (array_chunk($creates, $this->batchLimit) as $chunk) {
                $response = $client->post(
                    "products/{$parentId}/variations/batch",
                    ['create' => array_values($chunk)]
                );

                if (! $response->successful()) {
                    $this->writeLog('error', 'Variation batch create failed', [
                        'product_id' => $product->id,
                        'woocommerce_id' => $parentId,
                        'status' => $response->status(),
                        'body' => $response->body(),
                    ]);

                    return false;
                }

                if (! $this->batchResponseHasNoErrors($response->json(), 'create')) {
                    $this->writeLog('error', 'One or more variation creations failed', [
                        'product_id' => $product->id,
                        'woocommerce_id' => $parentId,
                        'response' => $response->json(),
                    ]);

                    return false;
                }
            }

            // Update parent stock status based on all local variants.
            $parentResponse = $client->put(
                "products/{$parentId}",
                [
                    'manage_stock' => false,
                    'stock_status' => $anyInStock ? 'instock' : 'outofstock',
                ]
            );

            if (! $parentResponse->successful()) {
                $this->writeLog('error', 'Variable parent stock status update failed', [
                    'product_id' => $product->id,
                    'woocommerce_id' => $parentId,
                    'status' => $parentResponse->status(),
                    'body' => $parentResponse->body(),
                ]);

                return false;
            }

            return true;
        } catch (Throwable $e) {
            $this->writeLog('error', 'Variable product sync exception', [
                'product_id' => $product->id,
                'woocommerce_id' => $parentId,
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }

    /**
     * Check whether the individual results in a Woo batch response contain errors.
     */
    private function batchResponseHasNoErrors(?array $response, string $key): bool
    {
        if (! is_array($response)) {
            return false;
        }

        $items = $response[$key] ?? null;

        if (! is_array($items)) {
            return false;
        }

        foreach ($items as $item) {
            if (
                ! is_array($item) ||
                isset($item['error']) ||
                isset($item['message'])
            ) {
                return false;
            }
        }

        return true;
    }

    /**
     * Check an individual product update returned by products/batch.
     */
    private function isSuccessfulBatchItem(?array $item): bool
    {
        if (! is_array($item)) {
            return false;
        }

        if (isset($item['error']) || isset($item['message'])) {
            return false;
        }

        return ! empty($item['id']);
    }

    /**
     * Calculate simple product stock from warehouse ID 4.
     */
    private function computeStockQuantity(int $productId): int
    {
        $sum = (float) product_warehouse::where('warehouse_id', 4)
            ->where('product_id', $productId)
            ->whereNull('deleted_at')
            ->sum('qte');

        return max(0, (int) round($sum));
    }

    /**
     * Calculate variant stock across all warehouses.
     */
    private function computeVariantStockQuantity(
        int $productId,
        int $variantId
    ): int {
        $sum = (float) product_warehouse::where('product_id', $productId)
            ->where('product_variant_id', $variantId)
            ->whereNull('deleted_at')
            ->sum('qte');

        return max(0, (int) round($sum));
    }

    /**
     * Calculate combo stock using the minimum available component quantity.
     */
    private function computeComboStockQuantity(int $productId): int
    {
        $components = DB::table('combined_products')
            ->where('product_id', $productId)
            ->get([
                'combined_product_id',
                'quantity',
            ]);

        if ($components->isEmpty()) {
            return $this->computeStockQuantity($productId);
        }

        $minimumQuantity = null;

        foreach ($components as $component) {
            $componentStock = $this->computeStockQuantity(
                (int) $component->combined_product_id
            );

            $requiredQuantity = max(1, (float) $component->quantity);

            $possibleQuantity = (int) floor(
                $componentStock / $requiredQuantity
            );

            $minimumQuantity = is_null($minimumQuantity)
                ? $possibleQuantity
                : min($minimumQuantity, $possibleQuantity);
        }

        return max(0, (int) ($minimumQuantity ?? 0));
    }

    /**
     * Record one failed product and update progress.
     */
    private function recordProductFailure(
        int $productId,
        int $woocommerceId,
        ?int $status,
        $body,
        array &$state,
        ?string $error = null
    ): void {
        $state['failed_products']++;

        $this->writeLog('error', 'Stock sync failed', [
            'product_id' => $productId,
            'woocommerce_id' => $woocommerceId,
            'status' => $status,
            'body' => $body,
            'error' => $error,
        ]);

        $this->markProcessed($state, $productId, false);
    }

    /**
     * Update processed count, percentage and last processed product.
     */
    private function markProcessed(
        array &$state,
        int $productId,
        bool $ok
    ): void {
        $state['processed_products']++;

        $state['last_product_id'] = $productId;
        $state['last_ok'] = $ok;

        $total = (int) $state['total_products'];

        $state['percentage'] = $total > 0
            ? min(100, (int) floor(
                ($state['processed_products'] / $total) * 100
            ))
            : 100;

        $this->saveProgress($state);
    }

    private function saveProgress(array $state): void
    {
        Cache::put($this->progressKey, $state, 3600);
    }

    private function failJob(string $message): void
    {
        $state = Cache::get($this->progressKey, []);

        $state['finished'] = true;
        $state['finished_at'] = now()->toDateTimeString();
        $state['error'] = $message;
        $state['percentage'] = 100;

        $this->saveProgress($state);

        $this->writeLog('error', $message, []);
    }

    private function writeLog(
        string $level,
        string $message,
        array $context = []
    ): void {
        try {
            WooCommerceLog::create([
                'action' => 'stock.sync',
                'level' => $level,
                'message' => $message,
                'context' => $context,
            ]);
        } catch (Throwable $e) {
            // Do not stop stock synchronization because logging failed.
            report($e);
        }
    }
}