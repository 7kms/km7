import Dao from './dao'
// export default async ()=>{
//     await Dao.init();
// }

export default async ()=>{
    await Dao.init();
    const Server = require('./index');
    return Server
}

