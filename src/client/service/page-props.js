
// import {isServer} from '~utils';

class PageProps {
    constructor(){
        this.store = {};
    }
    getPropsByPath = (path)=>{
        let obj = this.store[path]
        if(obj){
            delete this.store[path];
        }else{
            obj = {}
        }
        return obj;
    }
    init = (obj = {})=>{
        this.store = obj;
    }
}

export default new PageProps();