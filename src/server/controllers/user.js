import {responseData,dateFormat} from '../utils';
import DAO from '../dao'
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
            let result =  await DAO.execute(`select * from user where account='${obj.account}'`);
            let user = result[0];
            if(user){
                let hashpassword = this.getHashPassword(obj.password,user.salt)
                if(hashpassword !== user.password){
                  res.json(responseData(401,{msg: 'account or password is not right'}))
                  return;
                }
            }else{
                let result = await DAO.execute(`select count(*) as count from user`)
                if(result[0].count === 0){
                    await this.register(obj);
                    let result = await DAO.execute(`select * from user where account='${obj.account}'`);
                    user = result[0];
                }else{
                    res.json(responseData(401,{msg: 'account or password is not right'}))
                    return;
                }
            }
            delete user.password;
            delete user.salt;
            req.session.user = user;
            res.json(responseData(200,{user}))
        }catch(e){
            throw new Error(e);
        }
    }
    register = async(obj)=>{
      let salt = Math.random().toString(16);
      let password = this.getHashPassword(obj.password,salt);
      let currentTime = dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss')
      return await DAO.execute(`INSERT INTO user values(null, 'km7','${obj.account}','${salt}','${password}',null,'${currentTime}','${currentTime}');`)
    }
    profile = async(req,res)=>{
        let user = req.session.user;
        res.json(responseData(200,{user}))
    }
    detail = async(req,res)=>{
        let {id} = req.params;
        try{
            let list =  await DAO.execute(`select name,account,avatar from user where id=${id}`)
            res.json(responseData(200,{user: list[0]}))
        }catch(e){
            res.json(responseData(500,e))
       }
    }
}

export default new User();