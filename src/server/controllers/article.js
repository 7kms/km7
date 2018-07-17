import {responseData} from '../utils'
import Model from '../model/article'

class Article {

    list = async (req,res)=>{
        const {categoryId} = req.params;
        let list = await Model.findAll({where:{categoryId},raw: true})
        res.json(responseData(200,{list}))
    }

    detail = async (req,res)=>{
        let {id} = req.params;
        let article = await Model.findOne({where:{id}})
        res.send(responseData(200,{article}))
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
        let obj = req.body;
        obj.userId = req.session.user.id;
        try{
            let result = await Model.create(obj)
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

export default new Article()