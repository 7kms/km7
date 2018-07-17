import {responseData} from '../utils'
import Model from '../model/tag';


class Tag {
    list = async (req,res)=>{
       try{
            let list = await Model.findAll({raw: true}); 
            res.json(responseData(200,{list}))
        }catch(e){
            res.json(responseData(500,e))
       }
    }
    update = async (req,res)=>{
        const {id} = req.params;
        const obj = req.body;
        try{
            await Model.update(obj,{where:{id}})
            res.json(responseData(200,{msg: 'success'}))
        }catch(e){
            res.json(responseData(500,e))
        }
    }
    insert = async (req,res)=>{
        let {name,categoryId} = req.body;
        try{
            let result = await Model.create({name,categoryId})
            res.json(responseData(200,{result}))
        }catch(e){
            res.json(responseData(500,{msg: e.sqlMessage}))
        }
    }
    remove = async (req,res)=>{
        const {id} = req.params;
        try{
            await Model.delete({where:{id}})
            res.json(responseData(200))
        }catch(e){
            res.json(responseData(500,e))
        }
    }
}

export default new Tag();