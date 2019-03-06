const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /(favicon\.png|sam_portrait\.jpg)$/,
                use: {
                    loader: 'url-loader'
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: /(favicon\.png|sam_portrait\.jpg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            emitFile: false,
                            publicPath: 'https://storage.googleapis.com/www.sambdavidson.com/static/images/',
                            outputPath: undefined
                        }
                    }
                ]
            },
            {
                test: /\.(pdf|css)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            emitFile: false,
                            publicPath: 'https://storage.googleapis.com/www.sambdavidson.com/static/',
                            outputPath: undefined
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            emitFile: false,
                            publicPath: 'https://storage.googleapis.com/www.sambdavidson.com/static/videos/',
                            outputPath: undefined
                        }
                    }
                ]
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        publicPath: 'https://storage.googleapis.com/www.sambdavidson.com/static/',
        path: path.resolve(__dirname, 'build-prod')
    }
});