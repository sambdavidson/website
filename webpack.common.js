const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'link:href', 'a:href']
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js' ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Samuel Davidson',
            template: './static/index.html',
            inject: 'head'
        })
    ]
};