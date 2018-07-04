import { $get } from '~utils/api'

export const SET_NAV_LIST =  Symbol('SET_NAV_LIST')


const setList = ({data})=>{
    return {
        type: SET_NAV_LIST,
        pyload: {
            list:data
        }
    }
}

export const fetchNav = ()=>{
    return async (dispatch)=>{
        try{
            const res = await $get('/nav')
            dispatch(setList(res))
        }catch(e){
            console.error(e)
        }
    }
}