import {responseData} from '../utils'
import Model from '../model/article'
import categoryModel from '../model/category'
import DAO from '../dao'
import redisService from '../service/redis-service'
class Article {
    transfromTagByStr = async (str)=>{
        if(!str)return str;
        let tagArr = str.split('-');
        let arr = [];
        for(let tagId of tagArr){
            let tag =  await redisService.getTag(String(tagId));
            tag && arr.push(tag)
        }
        return arr;
    }
    list = async (req,res)=>{
        try{
            let {category} = req.params;
            const {page = 0, size = 20} = req.query;
            if(!category){
                let navList = await redisService.getNav();
                if(navList.length){
                    category = navList[0].key;
                }else{
                    res.json(responseData(200,{list:[]}))
                    return;
                }
            }
            let list = await DAO.execute(`SELECT a.id,a.title,a.keywords,a.description,a.tags,a.view,a.createdAt,a.updatedAt,c.name category, c.id categoryId 
                                        from articles a JOIN categories c on a.categoryId = c.id where c.key = '${category}' limit ${page*size}, ${size}`)
            for(let item of list){
                item.tags = await this.transfromTagByStr(item.tags);
                item.category = {
                    name: item.category,
                    id: item.categoryId
                }
                delete item.categoryId;
            }
            res.json(responseData(200,{list}))
        }catch(e){
            res.status(500).end();
            logger.error(e);
            throw new Error(e)
        }
        
    }

    detail = async (req,res)=>{
        let {id} = req.params;
        let article = await Model.findOne({where:{id}, row: true})
        article.category = await categoryModel.findOne({where:{id: article.categoryId}})
        article.tags = await this.transfromTagByStr(article.tags);
        res.send(responseData(200,{article}))
        DAO.execute(`UPDATE articles SET view=view+1 where id=${id}`)
    }
    bgdetail = async (req,res)=>{
        let {id} = req.params;
        let article = await Model.findOne({where:{id}, row: true})
        res.send(responseData(200,{article}))
    }
    update = async (req,res)=>{
        const {id} = req.params;
        const obj = req.body;
        try{
            await Model.update(obj,{where:{id}})
            await redisService.refreshNav()
            res.json(responseData(200,{msg: 'success'}))
        }catch(e){
            res.json(responseData(500,e))
        }
    }

    insert = async (req,res)=>{
        let obj = req.body;
        obj.userId = req.session.user.id;
        try{
            let result = await Model.create(obj)
            await redisService.refreshNav()
            res.json(responseData(200,{result}))
        }catch(e){
            logger.error(e)
            res.json(responseData(500,{msg: e.sqlMessage}))
        }
    }

    remove = async (req,res)=>{
        const {id} = req.params;
        try{
            await Model.destroy({where:{id}})
            await redisService.refreshNav()
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

export default new Article()