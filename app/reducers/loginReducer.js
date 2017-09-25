import { UserLoginActionTypes } from '../common/Enums'

const { 
		AUTHENTICATING, 
		AUTHENTICATED, 
		AUTHENTICATION_ERROR, 
		USER_ACCOUNT_CREATING, 
		USER_ACCOUNT_CREATED, 
		USER_ACCOUNT_CREATION_ERROR, 
		BACK_TO_LOGIN, 
		USER_LOGGING_OUT,
		USER_LOGGED_OUT,
		RESENDING_VARIFICATION,
		RESENT_VARIFICATION,
		EMAIL_VARIFIED,
		EMAIL_NOT_VARIFIED,
		LOGIN_EMAIL_INPUT,
		LOGIN_PASSWORD_INPUT,
		SHOW_CREATE_ACCOUNT,
		ENABLE_LOGIN
	  } = UserLoginActionTypes

const defaultState = {
	inputEmail: '',
	inputPassword: '',
	error: undefined, 
	stateDescription: USER_LOGGED_OUT,
	userVarificationStatus: false,
	loginButtonDisabled: true,
	createAccount: false
}

export default function reducer (state = defaultState, action) {
	switch (action.type) {
		case LOGIN_EMAIL_INPUT : {
			state = { ...state, inputEmail: action.payload, stateDescription: action.type }
			break
		} 
		case LOGIN_PASSWORD_INPUT : {
			state = { ...state, inputPassword: action.payload, stateDescription: action.type }
			break;	
		}
		case AUTHENTICATING : {
			state = { ...state, stateDescription: action.type };
			break;	
		}
		case AUTHENTICATED : {
			state = { ...state, stateDescription: action.type, userVarificationStatus: action.payload.emailVerified};
			break;	
		}
		case USER_ACCOUNT_CREATING: {
			state = { ...state, stateDescription: action.type};
			break;	
		}
		case USER_ACCOUNT_CREATED : {
			state = { ...state, stateDescription: action.type};
			break	
		}
		case USER_ACCOUNT_CREATION_ERROR: {
			state = { ...state, stateDescription: action.type};
			break
		}
		case AUTHENTICATION_ERROR : {
			state = { ...state, error: action.payload, stateDescription: action.type };
			break;
		}
		case USER_ACCOUNT_CREATION_ERROR : {
			state = { ...state, error: action.payload, stateDescription: action.type };
			break;	
		}
		case RESENT_VARIFICATION : {
			state = { ...state, stateDescription: action.type }
			break
		}
		case RESENDING_VARIFICATION : {
			state = { ...state, stateDescription: action.type }
			break
		}
		case USER_LOGGING_OUT : {
			state = { ...state, stateDescription: action.type }
			break	
		}
		case USER_LOGGED_OUT : {
			state = { ...state, ...defaultState }
			break	
		}
		case BACK_TO_LOGIN : {
			state = { ...state, stateDescription: action.type }
			break	
		}
		case ENABLE_LOGIN : {
			state = { ...state, loginButtonDisabled: !action.payload, stateDescription: action.type }
			break
		}
		case SHOW_CREATE_ACCOUNT : {
			state = { ...state, createAccount: action.payload, inputEmail: "", inputPassword: "", loginButtonDisabled: true, stateDescription: action.type }
			break;
		}
	}

	console.log(state);
	return state;
}

