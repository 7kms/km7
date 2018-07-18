import {responseData} from '../utils';
import Model from '../model/category';
import redisService from '../service/redis-service'

class Category {
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
        const {name} = req.body;
        try{
            await Model.update({name},{where:{id}})
            await redisService.refreshNav()
            res.json(responseData(200,{msg: 'success'}))
        }catch(e){
            res.json(responseData(500,e))
        }
    }
    insert = async (req,res)=>{
        let {name} = req.body;
        try{
            let result = await Model.create({name})
            res.json(responseData(200,{result}))
        }catch(e){
            res.json(responseData(500,{msg: e.sqlMessage}))
        }
    }
    remove = async (req,res)=>{
        const {id} = req.params;
        try{
            await Model.destroy({where:{id}})
            res.json(responseData(200))
        }catch(e){
            if(e.name == 'SequelizeForeignKeyConstraintError'){
                res.json(responseData(407,{msg: 'still has tags belong to this category'}))
            }else{
                res.json(responseData(500,e))
            }
        }
    }
}

export default new Category();