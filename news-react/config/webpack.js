const webpack = require('webpack');
const fs = require('fs');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const postcssImport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const fontMagician = require('postcss-font-magician');

const meta = JSON.parse(fs.readFileSync('./config/app.json', 'utf8'));
const colors = JSON.parse(fs.readFileSync('./config/colors.json', 'utf8'));
const cssModulesNameFormat = '[hash:base64]';

const config = {
    entry: './src/index.js',
    output: {
        path: './build',
    },
    plugins: [
        new HtmlPlugin({
            template: './src/index.ejs',
            filename: 'index.html',
            minify: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
            },
            inject: false,
            meta: meta,
            colors: colors,
            baseUrl: 'http://localhost:3000',
        }),
        new CopyPlugin([
            {from: './src/static', to: './'},
        ]),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            }
        }),
    ],
    module: {
        loaders: [
            {
                test: /.js$/,
                loader: 'babel',
                exclude: [/node_modules/, /.ejs$/],
                query: {
                    presets: ['env', 'react'],
                },
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName='+cssModulesNameFormat+'!postcss-loader',
                exclude: [/node_modules/],
            },
            {
                test: /\.json$/,
                loader: 'json',
                exclude: [/node_modules/],
            },
            {
                test: /\.svg$/,
                loader: 'raw',
                exclude: [/node_modules/],
            },
        ]
    },
    postcss: function () {
        return [
            postcssImport,
            cssnext({
                features: {
                    customProperties: {
                        variables: colors,
                    },
                },
            }),
            fontMagician(),
        ];
    },
};

module.exports = config;
