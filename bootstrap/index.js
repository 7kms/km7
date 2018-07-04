
global.logger = require('../utils/logger')
require('babel-register')()
require('babel-polyfill')
require('./app')
