const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const webpack = require('webpack');


module.exports = {
    name: 'lcp-setting',
    mode: 'development', // or production
    devtool: 'eval',
    resolve: {
      extensions: ['.js', '.jsx']
    },
    entry: {
        app: ['./client'],
    }, // 입력
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env',{
                        targets: {
                          browsers: ['> 1% in KR'] // browserslist
                        },
                        debug: true,
                    }],
                    '@babel/preset-react',
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel'
                ]
            },
            exclude: path.join(__dirname, 'node_modules'),
        }]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({debug: true}),
      new RefreshWebpackPlugin()

    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist',
    }, // 출력
    devServer: {
        devMiddleware: { publicPath: '/dist' },
        static: { directory: path.resolve(__dirname) },
        hot: true
    }
}