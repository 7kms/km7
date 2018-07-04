import axios from 'axios';
import { API_TIMEOUT, SERVERURL} from '~config';
let generateUrl = (url) => {
    return url 
}

let headerConfig = ()=>{
    let obj = {
        headers : {
            'Content-Type': 'application/json'
        }
    };
    return obj
}

let CancelToken = axios.CancelToken;

const baseObj = {
    timeout: API_TIMEOUT,
    // withCredentials: true,
    responseType: 'json'
}

const errorProcess = (err)=>{
    // console.log(err);
    return Promise.reject(err)
}



export const createCancelTokenSource = ()=>{
    return CancelToken.source();
}

const generateRequestObj = (method,url,paramsObj,cancelToken,noToken)=>{
    let obj = {
        method: method,
        url: generateUrl(url),
        baseURL: SERVERURL,
        cancelToken
    };
    if(method === 'get'){
        obj.params = paramsObj
    }else{
        obj.data = paramsObj
    }
    return Object.assign({},baseObj,obj,headerConfig(noToken))
}

export const $get = (url, paramsObj={}, cancelToken)=>{
   let configObj = generateRequestObj('get',url,paramsObj,cancelToken);
    return axios(configObj).then(res=>{
        return Promise.resolve(res.data)
    },errorProcess)
}


export const $post = (url, paramsObj={}, cancelToken)=>{
    let configObj = generateRequestObj('post',url,paramsObj,cancelToken);
    return axios(configObj).then(res=>{
         return Promise.resolve(res.data)
     },errorProcess)
}

export const $postwithoutauthor = (url, paramsObj={}, cancelToken)=>{
    let configObj = generateRequestObj('post',url,paramsObj,cancelToken,true);
    return axios(configObj).then(res=>{
         return Promise.resolve(res.data)
     },errorProcess)
}

export const $postwithformdata= (url, paramsObj={})=>{
    let arr = [];
    for(let i in paramsObj){
        if(paramsObj[i] && paramsObj.hasOwnProperty(i)){
            arr.push(`${i}=${encodeURIComponent(paramsObj[i])}`);
        }
    }
    return axios(Object.assign({},baseObj,{
        method: 'post',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        url: generateUrl(url),
        baseURL: SERVERURL,
        data: arr.join('&')
    })).then(res=>{
        return Promise.resolve(res.data)
    },errorProcess)
}

export const $delete = (url, paramsObj={}, cancelToken)=>{
    let configObj = generateRequestObj('delete',url,paramsObj,cancelToken);
    return axios(configObj).then(res=>{
        return Promise.resolve(res.data)
    },errorProcess)
}