import { combineReducers } from 'redux'
import login from './loginReducer'
import profile from './profileReducer'

export default combineReducers({
	login,
	profile
})
