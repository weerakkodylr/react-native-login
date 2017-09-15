import { UserDataLoadingProcessStatus } from '../common/Enums'

export default function userReducer(state={
	name: undefined,
	email: undefined,
	dateOfBirth: undefined,
	gender: undefined,
	dataStatus: undefined
}, action){

	switch (action.type) {
		case "SET_USER_GENDER" : {
			state = {...state, gender: action.payload}
			break
		}
		case "SET_USER_DISPLAY_NAME" : {
			state = {...state, displayName: action.payload}
			break
		}
		case "SET_USER_BIRTHDAY" : {
			state = {...state, dateOfBirth: action.payload}
			break
		}
		case "REQUESTING_PROFILE_DATE": {
			state = {...state, dataStatus: UserDataLoadingProcessStatus.REQUESTING_USER_PROFILE_DATA}
			break
		}
		case "LOAD_PROFILE_DATA_SUCCESS" : {
			state = {...state, dataStatus: UserDataLoadingProcessStatus.USER_PROFILE_DATA_RECEIVED, displayName: action.payload.displayName, gender: action.payload.gender, dateOfBirth: action.payload.dateOfBirth}
			break
		}
		// case "UPDATE_USER_PROFILE" : {
		// 	state = {...state, displayName: action.payload.displayName, email: action.payload.email, gender: action.payload.gender, dateOfBirth: action.payload.}
		// }
	}

	return state;

	return state;
}