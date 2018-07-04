import pathConfig from '../build/pathConfig'
import fs from 'fs'
import path from 'path'
import express from 'express'
import generateTemplate from './template'
const resolve = file => path.resolve(__dirname, file)

const createRenderer = ({default: serverRender}, {template}) => {
  return async (url)=>{
    try{
      const pageInfo =  await serverRender(url)
      if(pageInfo.status == 200){
        pageInfo.html = generateTemplate(template,pageInfo)
      }
      return pageInfo
    }catch(e){
      return {
        status:500,
        error:e
      }
    }
  }
}

class App {
    constructor({isDev=true,app}){
      this.isDev = isDev;
      this.renderer = null;
      this.readyPromise = null;
      this.app = app || express();
      this.serverInfo = `express/${require('express/package.json').version}`;
      this.initial();
    }
    initial = ()=>{
      this.prepareRender()
      this.initRouter()
    }
    initRouter = () =>{
        logger.log('init router')
        const app = this.app;
        app.use(pathConfig.staticPublicPath, express.static(resolve(pathConfig.clientOutput), {
          maxAge: 0,
          index: false
        }));
        app.get('*', async (req, res)=>{
          if(this.isDev){
            this.readyPromise.then(this.handel(req,res))
          }else{
            this.handel(req,res)
          }
        })
    }
    start = (port = 8080)=>{
      this.app.listen(port,(err)=>{
        if(!err){
          console.log(`Page server is running at ${port}`)
        }
      })
    }
    handel = async (req,res)=>{
      logger.info('start rendering')
      const s = Date.now()
      res.setHeader("Content-Type", "text/html")
      res.setHeader("Server", this.serverInfo)
      if(!this.renderer){
        res.send('Page is initializing, please refresh leater')
      }
      const result = await this.renderer(req.originalUrl)
      if(result.status == 200){
        res.send(result.html)
      }else if(result.status == 301){
        res.redirect(result.context.url)
      }else{
        logger.error(result.error.stack);
        res.status(500).send(result)
      }
      logger.info(`whole request: >>: %s %d ms`,req.url,Date.now() - s)
    }
    prepareDev = ()=>{
      const templatePath = pathConfig.htmlTemplate
      this.readyPromise = require('../build/setup-dev-server')(
        this.app,
        templatePath,
        (bundle, options) => {
          this.renderer = createRenderer(bundle, options)
        }
      )
    }
    prepareProd = ()=>{
      const templatePath = `${pathConfig.clientOutput}/index.html`
      const template = fs.readFileSync(templatePath, 'utf-8')
      const bundle = require(`${pathConfig.serverOutput}/server.js`)
      this.renderer = createRenderer(bundle, {template})
    }
    prepareRender = ()=>{
      if(this.isDev){
        this.prepareDev()
      }else{
        this.prepareProd()
      }
    }
}

export default (props)=>{
  return new App(props)
}