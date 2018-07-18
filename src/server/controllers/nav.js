import {responseData} from '../utils'
import redisService from '../service/redis-service'

export const navList = async (req,res)=>{
    let list = await redisService.getNav();
    res.json(responseData(200,{list}))
}