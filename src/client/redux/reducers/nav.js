import * as ActionTypes from '~actions/nav'

const initialState = {
    list: []
}

export const navInfo = (state=initialState,{type,pyload}) => {
    switch (type){
        case ActionTypes.SET_NAV_LIST:
           return Object.assign({}, state, {list: [...state.list,...pyload.list]}) 
        default : 
           return state
    }
}