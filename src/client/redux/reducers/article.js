import * as ActionTypes from '~actions/article'

const initialState = {
    list: []
}

export const articleInfo = (state=initialState,{type,pyload}) => {
    switch (type){
        case ActionTypes.SET_ARTICLE_LIST:
           return Object.assign({}, state, {list: [...state.list,...pyload.list]}) 
        case ActionTypes.EMPTY_ARTICLE_LIST:
            return Object.assign({}, state, {list: []}) 
        default : 
           return state
    }
}