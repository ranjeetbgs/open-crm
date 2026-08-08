<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Sale Invoice - {{ '22' }}</title>

     @php
        // Price formatting helper function (shared behavior with other PDFs)
        $priceFormat = $setting['price_format'] ?? null;
        function formatPrice($number, $decimals = 2, $priceFormat = null) {
            $number = (float) $number;
            $decimals = (int) $decimals;

            if (empty($priceFormat)) {
                return number_format($number, $decimals, '.', ',');
            }

            switch ($priceFormat) {
                case 'comma_dot':
                    return number_format($number, $decimals, '.', ',');
                case 'dot_comma':
                    return number_format($number, $decimals, ',', '.');
                case 'space_comma':
                    return number_format($number, $decimals, ',', ' ');
                default:
                    return number_format($number, $decimals, '.', ',');
            }
        }
    @endphp

    <style>
        @page {
            size: A4;
            margin: 10mm 15mm;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'DejaVu Sans', 'Arial', sans-serif;
            font-size: 9pt;
            color: #1f2937;
            line-height: 1.4;
            padding: 15px 20px;
            max-width: 100%;
        }

        table {
  border-collapse: collapse; 
  width: 100%;
}
    </style>
</head>

<body>
    <div class="modal-dialog modal-sm modal-dialog-scrollable"><span tabindex="0"></span>
        <div id="Show_invoice___BV_modal_content_" tabindex="-1" class="modal-content">
            
            <div id="Show_invoice___BV_modal_body_" class="modal-body">
                <div id="invoice-POS">
                    <div style="max-width: 400px; margin: 0px auto;">
                        <div>
                            <div class="info">
                                <div class="invoice_logo text-center mb-2" style="margin: 20px auto; text-align: center;">
                                     @if(!empty($setting['logo']) && file_exists(public_path('images/'.$setting['logo'])))
                    <img src="{{public_path('images/'.$setting['logo'])}}" alt="Logo" style="display: inline-block; max-height: 60px; max-width: 180px;">
                @endif
                                    
                                
                                </div>
                                <p><span><center><strong>Trinkly</strong><br></span> <span>
                                    <span><strong>TAX INVOICE</strong></center><br></span>
                                        Invoice No : {{$sale['Ref']}}<br></span> <span>
                                        Date : {{$sale['date']}}<br></span>
                                         <span>Address : {{$sale["warehouse"]["city"]}}<br></span>
                                    <span>
                                        Email : {{$sale["warehouse"]['email']}}<br></span> <span>
                                        Phone : {{$sale["warehouse"]['mobile']}}<br></span> <span>
                                        Customer : {{$sale['client_name']}}<br></span> </p>
                            </div>
                            <table class="table_data" style="width: 100%; margin-top:20px">
                                <tbody>
                                @php $subTotal = 0; @endphp
                                @foreach ($details as $item)
                                    <tr style="border-bottom:1px dashed #333333; margin-bottom:20px">
                                        <td colspan="3">
                                            {{$item['name']}} ({{$item['code']}})
                                            <br style="display: none;">
                                             <span style="font-size: smaller;">{{$item['guarantee']}}</span>
                                            <br> <span>{{$item['quantity']}} {{$item['unit_sale']}} X {{$item['total']}}</span>
                                        </td>
                                        <td style="text-align: right; vertical-align: bottom;">
                                           {{formatPrice($item['quantity'] * $item['total']) }}

                                           @php $subTotal = $subTotal + ($item['quantity'] * $item['total']); @endphp
                                        </td>
                                    </tr>
                                    
                                @endforeach


                                @php
                                     $discount = $subTotal*$sale['discount']/100;
                                     $total = $subTotal - $discount;
                                     $gst =  ($total *1.5 )/103;
                                @endphp


                                <tr style="margin-top: 20px;">
                                        <td colspan="3" class="total"> &nbsp;</td>
                                        <td class="total" style="text-align: right;">
                                            
                                        </td>
                                    </tr>



                                

                                    <tr style="margin-top: 20px;">
                                        <td colspan="3" class="total">Subtotal</td>
                                        <td class="total" style="text-align: right;">
                                            INR {{formatPrice($subTotal)}}
                                        </td>
                                    </tr>
                                    <tr style="margin-top: 10px;">
                                        <td colspan="3" class="total">Discount </td>
                                        <td class="total" style="text-align: right;">
                                           {{$sale['discount']}}% (INR {{formatPrice($subTotal*$sale['discount']/100)}})
                                        </td>
                                    </tr>
                                    <tr style="display: none;">
                                        <td colspan="3" class="total">Discount from Points</td>
                                        <td class="total" style="text-align: right;">
                                            INR 0.00
                                        </td>
                                    </tr> <!---->
                                    @if((int)$sale['shipping'])
                                    <tr style="margin-top: 10px;">
                                        <td colspan="3" class="total">Loyalty Card</td> 
                                        <td class="total" style="text-align: right;">
                    INR {{formatPrice($sale['shipping'])}}
                  </td></tr>
                  @endif

                                    <tr style="margin-top: 10px;">
                                        <td colspan="3" class="total">IGST</td>
                                        <td class="total" style="text-align: right;">
                                            INR {{formatPrice($gst)}} (1.50 %)
                                        </td>
                                    </tr>
                                    <tr style="margin-top: 10px;">
                                        <td colspan="3" class="total">CGST</td>
                                        <td class="total" style="text-align: right;">
                                             INR {{formatPrice($gst)}} (1.50 %)
                                        </td>
                                    </tr>
                                    <tr style="margin-top: 10px;">
                                        <td colspan="3" class="total">Total</td>
                                        <td class="total" style="text-align: right;">
                                             INR {{formatPrice($sale['GrandTotal'])}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" class="total">Paid</td>
                                        <td class="total" style="text-align: right;">
                                            INR {{formatPrice($sale['paid_amount'])}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" class="total">Due</td>
                                        <td class="total" style="text-align: right;">
                                            INR {{formatPrice($sale['GrandTotal'] - $sale['paid_amount'])}}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                           
                            <div id="legalcopy" class="ml-2"  style=" margin-top:20px">
                                <p class="legal" style="text-align: center;"><strong>Color guarranty is applicable only on products with
                                        'Anti-tarnish' mentioned in their name.</strong></p> <!----> <!---->
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div><span tabindex="0"></span>
    </div>



</body>

</html>
