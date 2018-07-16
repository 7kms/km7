import {responseData} from '../utils'
import DAO from '../dao'

class Category {
    list = async (req,res)=>{
        console.log(req.query)
       try{
            let list =  await DAO.execute(`select * from category`)
            res.json(responseData(200,{list}))
        }catch(e){
            res.json(responseData(500,e))
       }
    }
    update = async (req,res)=>{
        try{
            let list =  await DAO.execute(`select * from category`)
            res.json(responseData(200,{list}))
        }catch(e){
            res.json(responseData(500,e))
        }
    }
    insert = async (req,res)=>{
        try{
            let list =  await DAO.execute(`select * from category`)
            res.json(responseData(200,{list}))
        }catch(e){
            res.json(responseData(500,e))
        }
    }
    remove = async (req,res)=>{
        try{
            let list =  await DAO.execute(`select * from category`)
            res.json(responseData(200,{list}))
        }catch(e){
            res.json(responseData(500,e))
        }
    }
}

export default new Category();