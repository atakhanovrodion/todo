const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }]
    },
    
    target: 'electron-renderer',
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
    watch: true,
}