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
    let list = await DAO.execute('select count(*),c.name, c.name key, from articles a, categories c where a.categoryId=c.id group by c.id')
    res.json(responseData(200,list))
}