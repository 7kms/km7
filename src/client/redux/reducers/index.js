import {combineReducers} from 'redux'
import * as Article from './article'
import * as Nav from './nav'




export default combineReducers({...Article,...Nav})