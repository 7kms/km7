'use strict';

const isProduct = process.env.NODE_ENV === 'production'
const path = require('path')
const pathConfig = require('./pathConfig')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const styleConfig = require('./styleConfig')
// https://webpack.js.org/plugins/mini-css-extract-plugin/#install

console.log('isProduct = %d',isProduct)
module.exports = merge({
  name: 'server',
  mode: 'development',
  devtool: 'source-map',
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
      ...styleConfig(true)
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
    }
  }
},baseConfig)