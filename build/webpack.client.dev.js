'use strict';

process.env.NODE_ENV = 'development'
const pathConfig = require('./pathConfig')
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const styleConfig = require('./styleConfig')

module.exports = merge({
  name: 'client',
  mode:  'development',
  devtool: 'source-map',
  target: 'web',
  entry: {
      app: pathConfig.clientEntry
   },
  output: {
      path: pathConfig.clientOutput,
      filename: 'static/[name].js',
      publicPath: pathConfig.staticPublicPath,
      libraryTarget: "umd"
  }, 
  module:{
    rules:[
      ...styleConfig(),
    ]
  },
  plugins: [
    // new CleanWebpackPlugin([pathConfig.clientOutput],{root: path.resolve()}),
    // new webpack.HotModuleReplacementPlugin(),
    //https://github.com/jantimon/html-webpack-plugin#configuration
    new HtmlWebpackPlugin({
      title: 'km7',
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