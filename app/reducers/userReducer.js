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
		USER_PROFILE_DATA_UPDATING_ERROR,
		USER_PROFILE_DATA_UPDATED_AND_NOTIFIED,
		EMPTY_USER_PROFILE_DATA_RECEIVED,
		SET_USER_EMAIL,
		ENABLE_UPDATE,
		USER_PROFILE_DATA_UPDATE_RE_AUTHENTICATION_REQUIRED
	  } = UserDataActionTypes

const defaultState = {
	displayName: undefined,
	email: undefined,
	gender: 'Gender',
	dateOfBirth: 'Date Of Birth',
	stateDescription: undefined,
	updateButtonDisabled: false,
	error: undefined,

}

export default function reducer (state = defaultState, action) {

	switch (action.type) {
		case SET_USER_GENDER : {
			state = {...state, gender: action.payload, stateDescription: action.type, error: undefined}
			break;
		}
		case SET_USER_DISPLAY_NAME : {
			state = {...state, displayName: action.payload, stateDescription: action.type, error: undefined}
			break;
		}
		case SET_USER_BIRTHDAY: {
			state = {...state, dateOfBirth: action.payload, stateDescription: action.type, error: undefined}
			break
		}
		case UPDATING_USER_PROFILE_DATA: {
			state = {...state, stateDescription: action.type, error: undefined}
			break
		}
		case USER_PROFILE_DATA_UPDATED: {
			state = {...state, stateDescription: action.type}
			break
		}
		case USER_PROFILE_DATA_UPDATING_ERROR: {
			state = {...state, stateDescription: action.type, error: action.payload}
			break
		}
		case USER_PROFILE_DATA_RECEIVED: {
			state = {...state, displayName: action.payload.displayName, gender: action.payload.gender, dateOfBirth: action.payload.dateOfBirth, updateButtonDisabled: (action.payload.displayName === ''), stateDescription: action.type, error: undefined}
			break;
		}
		case USER_PROFILE_DATA_UPDATED_AND_NOTIFIED: {
			state = {...state, stateDescription: action.type}
			break
		}
		case USER_PROFILE_DATA_RECEIVING_ERROR: {
			state = {...state, stateDescription: action.type, error: action.payload}
			break
		}
		case USER_PROFILE_DATA_UPDATE_RE_AUTHENTICATION_REQUIRED: {
			state = {...state, stateDescription: action.type, error: action.payload}
			break
		}
		case REQUESTING_USER_PROFILE_DATA: {
			state = {...state, ...defaultState, stateDescription: action.type}
			break	
		}
		case EMPTY_USER_PROFILE_DATA_RECEIVED: {
			state = {...state, ...defaultState, stateDescription: action.type, updateButtonDisabled: true }
			break	
		}
		case SET_USER_EMAIL: {
			state = {...state, email: action.payload, stateDescription: action.type, error: undefined}
			break		
		}
		case ENABLE_UPDATE: {
			state = {...state, updateButtonDisabled: !action.payload, stateDescription: action.type, error: undefined}
			break			
		}
	}

	return state;
}