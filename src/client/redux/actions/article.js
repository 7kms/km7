import { $get } from '~utils/api'

export const SET_ARTICLE_LIST =  Symbol('SET_ARTICLE_LIST')
export const EMPTY_ARTICLE_LIST =  Symbol('EMPTY_ARTICLE_LIST')


const setArticleList = ({data})=>{
    return {
        type: SET_ARTICLE_LIST,
        pyload: {
            list:data
        }
    }
}

export const emptyList = ()=>{
    return {
        type: EMPTY_ARTICLE_LIST,
        pyload: {}
    }
}

export const fetchList = (category='frontend',params)=>{
    return async (dispatch)=>{
        try{
            const res = await $get(`/article/${category}`,params)
            dispatch(setArticleList(res))
        }catch(e){
            console.error(e)
        }
    }
}