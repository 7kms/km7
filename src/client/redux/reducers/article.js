import * as ActionTypes from '~actions/article'

const initialState = {
    list: [],
    article: {}
}

export const articleInfo = (state=initialState,{type,pyload}) => {
    switch (type){
        case ActionTypes.SET_ARTICLE_LIST:
           return Object.assign({}, state, {list: [...state.list,...pyload.list]}) 
        case ActionTypes.EMPTY_ARTICLE_LIST:
            return Object.assign({}, state, {list: []}) 

        case ActionTypes.SET_ARTICLE:
            return Object.assign({}, state, {article: pyload.article})
        default : 
           return state
    }
}