
import express from 'express'
import routers from './router'
import config from './config'
let port = config.port

class Server {
  constructor(){
    this.app = express()
  }

  start = ()=>{
      const app = this.app;
      app.use('/api', routers)
    
      app.use(function(err, req, res) {
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