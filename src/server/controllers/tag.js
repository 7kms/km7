import {responseData} from '../utils'
import Model from '../model/tag';
import DAO from '../dao';
import redisService from '../service/redis-service'


class Tag {
    list = async (req,res)=>{
        let list = await DAO.execute('select t.id, t.name ,t.categoryId,c.name category from tags t,categories c where t.categoryId=c.id order by t.categoryId');
        const obj = {};
        list.forEach(tag=>{
            if(!obj[tag.category]){
                obj[tag.category] = {
                    count: 0,
                    tags: [],
                    categoryId: tag.categoryId,
                    categoryName: tag.category
                };
            }
            obj[tag.category].tags.push({id: tag.id,name: tag.name});
            obj[tag.category].count++
        })
        // let list = await Model.findAll({raw: true}); 
        res.json(responseData(200,obj))
    }
    update = async (req,res)=>{
        const {id} = req.params;
        const obj = req.body;
        await Model.update(obj,{where:{id}})
        await redisService.refreshTags()
        res.json(responseData(200,{msg: 'success'}))
    }
    insert = async (req,res)=>{
        let {name,categoryId} = req.body;
        try{
            let result = await Model.create({name,categoryId})
            await redisService.refreshTags()
            res.json(responseData(200,{result}))
        }catch(e){
            res.json(responseData(500,{msg: e.sqlMessage}))
        }
    }
    remove = async (req,res)=>{
        const {id} = req.params;
        try{
            await Model.destroy({where:{id}})
            await redisService.refreshTags()
            res.json(responseData(200))
        }catch(e){
            res.json(responseData(500,e))
        }
    }
}

export default new Tag();