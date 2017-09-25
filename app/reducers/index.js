import { combineReducers } from 'redux'
import login from './loginReducer'
import user from './userReducer'
import layout from './layoutReducer'

export default combineReducers({
	login,
	user,
	layout
})
