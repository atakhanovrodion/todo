const path = require('path')


module.exports = {
    mode:'development',
    entry: './src/electron/index.js',
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: 'index.js'
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            use: 'babel-loader'
        }
        ]
    },
    target: 'electron-main'

}