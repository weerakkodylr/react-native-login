import { UserDataActionTypes } from '../common/Enums'

const { 
		SET_USER_GENDER,
		SET_USER_DISPLAY_NAME,
		SET_USER_BIRTHDAY,
		REQUESTING_USER_PROFILE_DATA,
		USER_PROFILE_DATA_RECEIVED,
		USER_PROFILE_DATA_RECEIVING_ERROR,
		UPDATING_USER_PROFILE_DATA,
		USER_PROFILE_DATA_UPDATED,
		USER_PROFILE_DATA_UPDATING_ERROR
	  } = UserDataActionTypes

export default function reducer (state = {
	displayName: null,
	email: null,
	gender: 'Gender',
	dateOfBirth: 'Date Of Birth'
}, action) {

	switch (action.type) {
		case SET_USER_GENDER : {
			state = {...state, gender: action.payload}
			break;
		}
		case SET_USER_DISPLAY_NAME : {
			state = {...state, displayName: action.payload}
			break;
		}
		case SET_USER_BIRTHDAY : {
			state = {...state, dateOfBirth: action.payload}
			break;
		}
		case USER_PROFILE_DATA_RECEIVED : {
			state = {...state, displayName: action.payload.displayName, gender: action.payload.gender, dateOfBirth: action.payload.dateOfBirth}
			break;
		}
		// case "UPDATE_USER_PROFILE" : {
		// 	state = {...state, displayName: action.payload.displayName, email: action.payload.email, gender: action.payload.gender, dateOfBirth: action.payload.}
		// }
	}

	return state;
}