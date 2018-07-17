import {responseData} from '../utils';
import DAO from '../dao'
import Model from '../model/user';
import crypto from 'crypto'

class User {
    getHashPassword = (password,salt)=>{
        const hash = crypto.createHmac('sha256', salt)
        .update(password)
        .digest('hex');
        return hash;
    }
    login = async(req,res)=>{
        const obj = req.body
        try{
            let result =  await Model.findAll({account: obj.account});
            let user = result[0];
            if(user){
                let hashpassword = this.getHashPassword(obj.password,user.salt)
                if(hashpassword !== user.password){
                  res.json(responseData(401,{msg: 'account or password is not right'}))
                  return;
                }
            }else{
                let result = await Model.findAll({attributes:[[DAO.sequelize.fn('count'),'count']]})
                if(result[0].count === 0){
                    await this.register(obj);
                    let result = await Model.findAll({account: obj.account});
                    user = result[0];
                }else{
                    res.json(responseData(401,{msg: 'account or password is not right'}))
                    return;
                }
            }
            req.session.user = user;
            res.json(responseData(200,{user}))
        }catch(e){
            throw new Error(e);
        }
    }
    register = async(obj)=>{
      let salt = Math.random().toString(16);
      let password = this.getHashPassword(obj.password,salt);
      return await Model.create({name: 'km7',salt,password})
    }
    profile = async(req,res)=>{
        let user = req.session.user;
        res.json(responseData(200,{user}))
    }
    detail = async(req,res)=>{
        let {id} = req.params;
        try{
            let list = await Model.findAll({attributes:['name','account'],where:{id}})
            res.json(responseData(200,{user:list[0]}))
        }catch(e){
            res.json(responseData(500,e))
       }
    }
}

export default new User();