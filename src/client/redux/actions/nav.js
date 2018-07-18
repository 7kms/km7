import { $get } from '~utils/api'

export const SET_NAV_LIST =  Symbol('SET_NAV_LIST')


const setList = (list)=>{
    return {
        type: SET_NAV_LIST,
        pyload: {
            list
        }
    }
}

export const fetchNav = ()=>{
    return async (dispatch)=>{
        try{
            const {list} = await $get('/nav')
            dispatch(setList(list))
        }catch(e){
            console.error(e)
        }
    }
}