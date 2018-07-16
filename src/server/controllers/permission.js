import {responseData} from '../utils';
class Permission {
    static needLogin = (req,res,next)=>{
        if(req.session.user){
            next()
        }else{
            res.json(responseData(401,{msg: 'please login first'}))
        }
    }
}

export default Permission;