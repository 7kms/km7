import program from 'commander';
import KM7App from './KM7App';
import BootStrap from '../src/server/bootstrap';

const isDev = process.env.NODE_ENV !== 'production';
program.option('-p, --port <n>')
       .option('--client')
       .option('--api')
       .parse(process.argv)

// console.log('program.port %j',program.port)
// console.log('program.client',program.client)
// console.log('program.api',program.api)


module.exports = async ()=>{
    if(program.client){
        KM7App({isDev}).start(program.port)
    }else{
        const apiServer = await BootStrap();
        if(!program.api){
            KM7App({isDev,app: apiServer.app})
        }
        apiServer.start()
    }
}