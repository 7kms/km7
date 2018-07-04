const MFS = require('memory-fs')
const webpack = require('webpack')
const chokidar = require('chokidar')
const clientConfig = require('./webpack.client.dev')
const serverConfig = require('./webpack.server.dev')

const requireFromString = (src, filename='test.js') => {
  var Module = module.constructor;
  var m = new Module();
  m._compile(src,filename);
  return m.exports;
}

const readFile = (fs, file) => {
  try {
    return fs.readFileSync(file, 'utf-8')
  } catch (e) {
    console.log(e)
  }
}

module.exports = function setupDevServer (app, templatePath, cb) {
  let bundle,template,ready,clientBuildDone;
  const readyPromise = new Promise(r => { ready = r })
  const update = () => {
    console.log('update ....',  bundle,  clientBuildDone)
    if (bundle && clientBuildDone) {
      template = readFile(devMiddleware.fileSystem,`${clientConfig.output.path}/index.html`)
      ready()
      cb(bundle, {template})
    }
  }

  // read template from disk and watch
  // template = fs.readFileSync(templatePath, 'utf-8')
  chokidar.watch(templatePath).on('change', () => {
    // template = fs.readFileSync(templatePath, 'utf-8')
    console.log('index.html template updated.')
    update()
  })

  // modify client config to work with hot middleware
  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
  clientConfig.output.filename = '[name].js'
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  clientConfig.plugins.push(new webpack.NamedModulesPlugin())

  // dev middleware
  const clientCompiler = webpack(clientConfig)
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true
  })
  app.use(devMiddleware)
  clientCompiler.plugin('done', stats => {
    clientBuildDone = true
    stats = stats.toJson()
    // stats.errors.forEach(err => console.error(err))
    // stats.warnings.forEach(err => console.warn(err))
    if (stats.errors.length) return
    console.log('clientCompiler done')
    update()
  })

  // hot middleware
  app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 }))

  // watch and update server renderer
  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  serverCompiler.outputFileSystem = mfs
  serverCompiler.plugin('done', stats => {
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    if (stats.errors.length) return
    logger.info('serverCompiler done')
    update()
  })
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) return
    bundle = requireFromString(readFile(mfs, `${serverConfig.output.path}/server.js`))
    update()
  })
  return readyPromise
}
