import {responseData} from '../utils';
import Model from '../model/category';
import redisService from '../service/redis-service'
import DAO from '../dao';

class Category {
    list = async (req,res)=>{
       try{
            let obj = {}
            let result = await DAO.execute('select c.id, c.name, c.key, t.id tId,t.name tName from categories c left join tags t on c.id = t.categoryId');
            result.forEach(item=>{
                let {id,name,key,...tag} = item;
                if(!obj[item.key]){
                    obj[item.key] = {id,name,key,tags:[]}
                }
                if(tag.tId){
                    obj[item.key].tags.push({id:tag.tId,name:tag.tName})
                }
            })
            res.json(responseData(200,{list: Object.values(obj)}))
        }catch(e){
            // console.log(e)
            // res.status(500).end(e.stack)
            res.json(responseData(500,"category list broke"))
       }
    }
    update = async (req,res)=>{
        const {id} = req.params;
        const {name,key} = req.body;
        try{
            await Model.update({name,key},{where:{id}})
            await redisService.refreshNav()
            res.json(responseData(200,{msg: 'success'}))
        }catch(e){
            res.json(responseData(500,e))
        }
    }
    insert = async (req,res)=>{
        let {name,key} = req.body;
        try{
            let result = await Model.create({name,key})
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