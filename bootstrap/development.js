process.env.NODE_ENV = 'development'

const express = require('express');
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
// const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const clientConfig = require('../build/webpack.client.dev');
// const serverConfig = require('../build/webpack.server');
// const compiler = webpack([clientConfig,serverConfig]);
const compiler = webpack(clientConfig);

app.use(webpackDevMiddleware(compiler, {
    publicPath: "/",
    // serverSideRender: true
}));
// app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
app.use(webpackHotMiddleware(compiler));
// app.use(webpackHotServerMiddleware(compiler));

app.listen(3100);