'use strict';

const path = require('path')
const pathConfig = require('./pathConfig')
const isProduct = process.env.NODE_ENV === 'production'
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const styleConfig = require('./styleConfig')

module.exports = merge({
  name: 'client',
  mode: isProduct ? 'production' : 'development',
  devtool: 'source-map',
  target: 'web',
  entry: {
    app: pathConfig.clientEntry
  },
  output: {
      path: pathConfig.clientOutput,
      filename: isProduct ? 'static/[name].[contenthash:6].js' : 'static/[name].js',
      publicPath: pathConfig.staticPublicPath,
      libraryTarget: "umd"
  }, 
  // devServer: {
  //   compress: true, // enable gzip compression
  //   historyApiFallback: true, // true for index.html upon 404, object for multiple paths
  //   hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
  //   https: false, // true for self-signed, object for cert authority
  //   noInfo: true, // only errors & warns on hot reload
  // },
  module:{
    rules:[
      ...styleConfig(),
    ]
  },
  plugins: [
    new CleanWebpackPlugin([pathConfig.clientOutput],{root: path.resolve()}),
    //https://github.com/jantimon/html-webpack-plugin#configuration
    new HtmlWebpackPlugin({
      title: '7km',
      template: pathConfig.htmlTemplate
    }) 
  ],
  optimization:{
    runtimeChunk: 'single',
    splitChunks: {
      chunks: "all",
      minSize: 1000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true
    }
  }
},baseConfig)