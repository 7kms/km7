import { $get } from '~utils/api'

export const SET_ARTICLE_LIST =  Symbol('SET_ARTICLE_LIST')
export const SET_ARTICLE =  Symbol('SET_ARTICLE')
export const EMPTY_ARTICLE_LIST =  Symbol('EMPTY_ARTICLE_LIST')


const setArticleList = (list)=>{
    return {
        type: SET_ARTICLE_LIST,
        pyload: {
            list
        }
    }
}

const setArticle = (article)=>{
    return {
        type: SET_ARTICLE,
        pyload: {
            article
        }
    }
}

export const emptyList = ()=>{
    return {
        type: EMPTY_ARTICLE_LIST,
        pyload: {}
    }
}


export const fetchList = (category='',params)=>{
    return async (dispatch)=>{
        try{
            const {list} = await $get(`/article/list/${category}`,params)
            dispatch(setArticleList(list))
        }catch(e){
            console.error(e)
        }
    }
}

export const fetchArticle = (id)=>{
    return async (dispatch)=>{
        try{
            const {article} = await $get(`/article/${id}`)
            dispatch(setArticle(article))
        }catch(e){
            console.error(e)
        }
    }
}