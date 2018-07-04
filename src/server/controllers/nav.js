import {responseData} from '../utils'

export const navList = (req,res)=>{
    const list = [
        {name:'FrontEnd',key:'frontend'},
        {name:'Ios',key:'ios'},
        {name:'Server',key:'server'},
        {name:'Algorithm',key:'algorithm'},
        {name:'Other',key:'other'}
    ]
    res.json(responseData(200,list))
}