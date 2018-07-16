
import express from 'express'
import routers from './router'
import config from './config'
import bodyParser from 'body-parser'
import session from 'express-session'
import connectRedis from 'connect-redis'
const RedisStore = connectRedis(session)



let port = config.port

class Server {
  constructor(){
    this.app = express()
  }
  start = async ()=>{
    const app = this.app;
    app.use(session({
      secret: 'cqjiaotong',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 7*24*60*60000 },
      store: new RedisStore(config.redis)
    }))
    app.use('/api', bodyParser.urlencoded({ extended: false }), bodyParser.json(), routers)
    app.use((req,res)=>{
      logger.warn(`404, ${req.originalUrl}`)
      res.sendStatus(404)
    })
    app.use((err, req, res) =>{
      logger.error(err.stack);
      res.status(500).send('Something broke!');
    })
    app.listen(port, (err) => {
      if(err){
        logger.error(err.stack)
        process.exit(0)
      }
      logger.info(`server started at http://127.0.0.1:${port}`)
    })
  }
}
export default Server;