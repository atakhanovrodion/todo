const path = require('path');
const webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
module.exports = {
  mode: 'development',
  entry: './src/electron/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  target: 'electron-main',
  externals: [nodeExternals()],
  devtool: 'eval-source-map'
};
