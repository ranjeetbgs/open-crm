const mix = require('laravel-mix');


/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


mix.js('resources/src/main.js', 'public/js')
   .js('resources/src/login.js', 'public/js')
   .js('resources/src/customer-display.js', 'public/js')
   .vue();

    mix.webpackConfig({
        resolve: {
            alias: {
                '@': __dirname + '/resources/src'
            }
        },
        stats: {
            children: true
        },
        
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    quietDeps: true,
                                    silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions', 'slash-div']
                                }
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new MomentLocalesPlugin(),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ['./js/*']
              }),
        ]
    });

