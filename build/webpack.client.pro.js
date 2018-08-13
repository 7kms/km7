'use strict';
process.env.NODE_ENV = 'production'
const path = require('path')
const pathConfig = require('./pathConfig')
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const styleConfig = require('./styleConfig')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge({
  name: 'client',
  mode: 'production',
  devtool: false,
  target: 'web',
  entry: {
    app: pathConfig.clientEntry
  },
  output: {
      path: pathConfig.clientOutput,
      filename: 'js/[name].[contenthash:6].js',
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
    },
    minimizer: [
      new UglifyJsPlugin({
        // include: [pathConfig.appSrc],
        cache: true,
        parallel: true,
        sourceMap: false // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
},baseConfig)