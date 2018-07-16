import mysql from 'mysql'
import config from '../config'

class DAO {
    constructor(){
        this.connection = null;
        // this.init();
    }
    init = async ()=>{
        return new Promise((resolve,reject)=>{
            const connection = mysql.createConnection(config.db);
            connection.connect((err) =>{
                if (err) {
                  logger.error('error connecting: ' + err.stack);
                  throw new Error(err);
                }
                logger.trace('mysql connected as id ' + connection.threadId);
                this.connection = connection;
                resolve()
            });
        })
        
    }
    execute = async (sql)=>{
        if(!this.connection){
            await this.init()
        }
        return new Promise((resolve)=>{
            let start = new Date()
            logger.log(`begin ${sql}`)
            this.connection.query(sql,((error, results, fields)=>{
                if(error){
                    throw error;
                }else{
                    let end = new Date()                
                    logger.trace(`cost ${end-start} , ${sql}`)
                    resolve(results)
                }
            }))
        })
    }
}

export default new DAO();

