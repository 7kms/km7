import mysql from 'mysql'
import config from './config'


export default async ()=>{
    return new Promise((resolve,reject)=>{
        const connection = mysql.createConnection(config.db);
        connection.connect(function(err) {
            if (err) {
              console.error('error connecting: ' + err.stack);
              reject(err);
            }
            console.log('mysql connected as id ' + connection.threadId);
            resolve(connection)
        });
    })
    
}