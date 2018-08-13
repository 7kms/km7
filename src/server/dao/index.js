import Sequelize from 'sequelize'
import config from '../config'
const {mysql} = config
class DAO {
    constructor(){
        this.sequelize = null;
        this.defineList = [];
    }
    getSequelize = async ()=>{
        if(!this.sequelize){
            await this.init()
        }
        return this.sequelize;
    }
    define = (...args)=>{
        return this.sequelize.define.apply(null,args)
    }
    init = async () => {
        const sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, {
            dialect: 'mysql',
            host: mysql.host,
            port: mysql.port,
            // Specify options, which are used when sequelize.define is called.
            // The following example:
            //   define: { timestamps: false }
            // is basically the same as:
            //   sequelize.define(name, attributes, { timestamps: false })
            // so defining the timestamps for each model will be not necessary
            define: {
                underscored: false,
                freezeTableName: false,
                charset: 'utf8',
                dialectOptions: {
                collate: 'utf8_general_ci'
                },
                timestamps: true
            },
            // similar for sync: you can define this to always force sync for models
            // sync: { force: true },
            // pool configuration used to pool database connections
            pool: {
                max: 5,
                idle: 30000,
                acquire: 60000,
            }
        });
        try{
            await sequelize.authenticate();
            // await sequelize.sync();
            this.sequelize = sequelize;
            logger.trace('Connection has been established successfully.');
        }catch(err){
            logger.error('Unable to connect to the database:', err);
            throw new Error(err);
        }
        return this.sequelize;
    }
    execute = async (sql)=>{
        return new Promise((resolve)=>{
            let start = new Date()
            logger.log(`begin ${sql}`)
            this.sequelize.query(sql,{raw: true}).spread((results, metadata)=>{
                let end = new Date()
                logger.trace(`cost ${end-start} , ${sql}`)
                // logger.info(metadata)
                resolve(results)
            }).catch(e=>{
                logger.error(e);
                throw new Error(e)
            })
        })
    }
}

export default  new DAO()

