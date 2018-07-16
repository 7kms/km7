import {responseData} from '../utils'
import DAO from '../dao'


class Tag {
    list = async (req,res)=>{
       try{
            let list =  await DAO.execute(`select * from tag`)
            res.json(responseData(200,{list}))
        }catch(e){
            res.json(responseData(500,e))
       }
    }
    update = async (req,res)=>{
        try{
            let list =  await DAO.execute(`select * from tags`)
            res.json(responseData(200,{list}))
        }catch(e){
            res.json(responseData(500,e))
        }
    }
    insert = async (req,res)=>{
        try{
            let list =  await DAO.execute(`select * from tags`)
            res.json(responseData(200,{list}))
        }catch(e){
            res.json(responseData(500,e))
        }
    }
    delete = async (req,res)=>{
        try{
            let list =  await DAO.execute(`select * from tags`)
            res.json(responseData(200,{list}))
        }catch(e){
            res.json(responseData(500,e))
        }
    }
}

export default new Tag();