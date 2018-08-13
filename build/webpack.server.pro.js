'use strict';

process.env.NODE_ENV = 'production'
const path = require('path')
const pathConfig = require('./pathConfig')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const styleConfig = require('./styleConfig')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// https://webpack.js.org/plugins/mini-css-extract-plugin/#install

module.exports = merge({
  name: 'server',
  mode: 'production',
  // devtool: 'source-map',
  target: 'node',
  entry:  pathConfig.serverEntry,
  output: {
      path: pathConfig.serverOutput,
      filename: 'server.js',
      publicPath: pathConfig.staticPublicPath,
      libraryTarget: "commonjs2"
  }, 
  module:{
    rules:[
      ...styleConfig(true),
    ]
  },
  plugins: [
    new CleanWebpackPlugin([pathConfig.serverOutput],{root: path.resolve()})
  ],
  optimization:{
    splitChunks: {
      chunks: "async",
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