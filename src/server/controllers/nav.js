import {responseData} from '../utils'
import DAO from '../dao'

export const navList = async (req,res)=>{
    // const list = [
    //     {name:'FrontEnd',key:'frontend'},
    //     {name:'Ios',key:'ios'},
    //     {name:'Server',key:'server'},
    //     {name:'Algorithm',key:'algorithm'},
    //     {name:'Other',key:'other'}
    // ]
    // select count(*) count, c.name, c.id from articles a, categories c where a.categoryId=c.id group by a.categoryId order by count desc;
    let list = await DAO.execute('select count(*) count, c.name, c.key, c.id from articles a, categories c where a.categoryId=c.id group by a.categoryId order by count desc')
    res.json(responseData(200,{list}))
}