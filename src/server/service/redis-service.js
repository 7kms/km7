import redis from 'redis';
import TagModel from '../model/tag';
// // import CategoryModel from '../model/category';
import DAO from '../dao'
import config from '../config';

class RedisService{
    constructor(){
        this.key_prefix = config.redis_key_prefix;
        this.client = null;
        
        this.redis_tag_dict = `${this.key_prefix}tagdict`;
        this.redis_nav_list = `${this.key_prefix}navlist`;
        this.init();
    }
    init = ()=>{
        this.client = redis.createClient(config.redis);
        this.client.on('error', function (err) {
            logger.error(err);
            throw new Error(err)
        });
        this.refreshNav();
        this.refreshTags();
    }
    getValueByKey = async (method, key)=>{
       return new Promise((resolve,reject)=> {
            this.client[method](key, function(err, reply) {
                resolve(reply)
            });
         })
    }
    getNav = async ()=>{
        let nav_str = await this.getValueByKey('get',this.redis_nav_list)
        if(nav_str){
           return JSON.parse(nav_str)
        }
        return await this.refreshNav();
    }
    refreshNav = async ()=>{
        // this.client.
        this.client.del(this.redis_nav_list)
        let list = await DAO.execute('select count(*) count, c.name, c.key, c.id from articles a, categories c where a.categoryId=c.id group by a.categoryId order by count desc')
        this.client.set(this.redis_nav_list,JSON.stringify(list));
        return list;
    }
    refreshTags = async ()=>{
       this.client.del(this.redis_tag_dict)
       let list =  await TagModel.findAll({attributes: ['id','name'], row: true});
       let arr = [];
       list.forEach(tag=>{
           arr = arr.concat(tag.id,tag.name)
       })
       if(arr.length){
        this.client.hset(this.redis_tag_dict,arr);
       }
       
    }
    getTag = async (id)=>{
        let name = await this.getValueByKey('hget',[this.redis_tag_dict, id]);
        return {
            id,
            name
        }
    }


    refreshCategories = async ()=>{
        
    }
    getCategories = async ()=>{

    }
}

export default new RedisService()