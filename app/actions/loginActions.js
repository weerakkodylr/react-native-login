//import firebase from 'firebase'
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
		ENABLE_LOGIN,
		SHOW_FORGOT_PASSWORD,
		ENABLE_CREATE_ACCOUNT,
		PASSWORD_RESET_EMAIL_SENDING,
		PASSWORD_RESET_EMAIL_SENT,
		PASSWORD_RESET_EMAIL_SENDING_ERROR,
	  } = UserLoginActionTypes

export function inputEmail(email){
	return {
		type: LOGIN_EMAIL_INPUT,
		payload : email
	}
}

export function inputPassword(password){
	return {
		type: LOGIN_PASSWORD_INPUT,
		payload : password,
	}
}

export function reSendVarification(firebase){
	
	return (dispatch) => {
		dispatch({ 
			type: RESENDING_VARIFICATION 
		});
		const currentUser = firebase.auth().currentUser;
		currentUser.sendEmailVerification().then(function() {
		  	// Email sent.
		  	console.log("Resending the email to " + currentUser.email)
		  	dispatch({ 
		  		type: RESENT_VARIFICATION 
		  	});
		})
	}
}

export function logOut(firebase){
	return (dispatch) => {
		dispatch({
			type: USER_LOGGING_OUT
		});
		firebase.auth().signOut().then(function() {
			// Sign-out successful.
			console.log("LOgging Out user")
			dispatch({
				type: USER_LOGGED_OUT
			});
		})
	}
}

export function goBackToLogin(){
	return {
		type: BACK_TO_LOGIN
	}
}

export function createAccount(email,password,firebase){
	return function (dispatch){
		dispatch({
			type: USER_ACCOUNT_CREATING
		})
		
		firebase.auth().createUserWithEmailAndPassword(email, password)
	  	.then(() => {
	  		const currentUser = firebase.auth().currentUser;
	  		currentUser.sendEmailVerification().then(function() {
				dispatch({
					type: USER_ACCOUNT_CREATED, 
					payload: firebase.auth().currentUser
				});
			}) 		
	  	}).catch((error) => {
		  dispatch({
		  	type: USER_ACCOUNT_CREATION_ERROR, 
		  	payload: error
		  });
		});
		  
	}
}

export function loginUser(email,password,firebase){
	return function (dispatch){
		dispatch({
			type: AUTHENTICATING
		})
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(() => {
			dispatch({
				type: AUTHENTICATED, 
				payload: firebase.auth().currentUser
			});
		})
		.catch((error) => {
			dispatch({
				type: AUTHENTICATION_ERROR, 
				payload: error
			});
		});
	}
}

export function showCreateAccount(showState){
	return {
		type: SHOW_CREATE_ACCOUNT,
		payload: showState
	}
}

export function enableLoginButton(enableStatus){
	
	return {
		type: ENABLE_LOGIN,
		payload: enableStatus
	}
}

export function enableCreateAccount(enableStatus){
	
	return {
		type: ENABLE_CREATE_ACCOUNT,
		payload: enableStatus
	}
}

export function showForgotPassword (showState) {
	return {
		type: SHOW_FORGOT_PASSWORD,
		payload: showState
	}
}

export function forgotPassword (email, firebase) {
	return function(dispatch){
		dispatch({
			type: PASSWORD_RESET_EMAIL_SENDING
		})

		let auth = firebase.auth();
		let emailAddress = email;

		auth.sendPasswordResetEmail(emailAddress)
		.then(() => {
		  	dispatch({
				type: PASSWORD_RESET_EMAIL_SENT
			})
		}).catch((error) => {
		  	dispatch({
				type: PASSWORD_RESET_EMAIL_SENDING_ERROR,
				payload: error
			})
		});
	}
}