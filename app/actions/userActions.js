import firebase from 'firebase'
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

export function setUserGender(gender){
	return {
		type: SET_USER_GENDER,
		payload: gender
	}
}

export function setName(gender){
	return {
		type: SET_USER_DISPLAY_NAME,
		payload: gender
	}
}

export function setEmail(email){
	return {
		type: SET_USER_EMAIL,
		payload: email
	}
}

export function setBirthday(dateOfBirth){
	return {
		type: SET_USER_BIRTHDAY,
		payload: dateOfBirth
	}
}

export function enableUpdate(enableStatus){
	return {
		type: ENABLE_UPDATE,
		payload: enableStatus
	}
}

export function getProfileDate(){
	
	return (dispatch) => {
		dispatch({
			type: REQUESTING_USER_PROFILE_DATA
		})

		const user = firebase.auth().currentUser

		if(user) {
			const userProfileData = firebase.database().ref('/UserProfile/' + user.uid)
			userProfileData.once('value')
			.then((snapshot)=>{
				//console.log(snapshot.val().displayName);
				if(snapshot.val())
					dispatch({
						type: USER_PROFILE_DATA_RECEIVED , 
						payload: {
									displayName: snapshot.val().displayName, 
									gender: snapshot.val().gender, 
									dateOfBirth: snapshot.val().dateOfBirth
								}
					});
				else
					dispatch({
						type: EMPTY_USER_PROFILE_DATA_RECEIVED
					});
			})
			.catch((error) => {
				dispatch({
				  	type: USER_PROFILE_DATA_RECEIVING_ERROR, 
				  	payload: error
				  });
			})
		}
	}

}


export function updateProfile(profile, firebase) {
	return (dispatch) => {
		dispatch({
			type: UPDATING_USER_PROFILE_DATA
		})
		
		const db = firebase.database()
		const user = firebase.auth().currentUser;
		const PuzzleLR = db.ref().child("PuzzleLR");
		const userProfile = db.ref().child("UserProfile");
		const primaryKey = profile.uid;

		user.updateEmail(profile.email)
		.then((result)=>{
			//Dispatch success email update
			return new Promise((resolve,reject)=>{
				userProfile.child(primaryKey).set({
					"displayName" : profile.displayName,
					"email" : profile.email,
					"gender" : profile.gender,
					"dateOfBirth" : profile.dateOfBirth
				})
				.then((result)=>{
					resolve(result)
				})
				.catch((error)=>{
					reject(error, {isProfileDataUpdateError:true})
				})
			})

		})
		.then((result)=>{
			dispatch({
				type: USER_PROFILE_DATA_UPDATED
			})	
		})
		.catch((error,flag)=>{
			console.log(error)

			if(flag && flag.isProfileDataUpdateError)
				dispatch({
					type: USER_PROFILE_DATA_UPDATING_ERROR,
					payload: error
				})
			else
				dispatch({
					type: USER_PROFILE_DATA_UPDATE_RE_AUTHENTICATION_REQUIRED,
					payload: error
				})
		})
		
		// Promise.all([
		// 	user.updateEmail(profile.email),
		// 	userProfile.child(primaryKey).set({
		// 		"displayName" : profile.displayName,
		// 		"email" : profile.email,
		// 		"gender" : profile.gender,
		// 		"dateOfBirth" : profile.dateOfBirth
		// 	})
		// ]).then((results)=>{
		// 	console.log("RESULTSSSSSSSSSSSSSSSSS ", results )
		// 	dispatch({
		// 		type: USER_PROFILE_DATA_UPDATED
		// 	})	
		// }).catch((error) => {
		// 	console.log("ERORRRRRRRRRRRRRRRRRRR ", error )
		// 	dispatch({
		// 		type: USER_PROFILE_DATA_UPDATING_ERROR,
		// 		payload: error
		// 	})
		// })

		
		/*
		userProfile.child(primaryKey).set({
			"displayName" : profile.displayName,
			"email" : profile.email,
			"gender" : profile.gender,
			"dateOfBirth" : profile.dateOfBirth
		}).then(()=>{
			dispatch({
				type: USER_PROFILE_DATA_UPDATED
			})			
		})
		.catch((error) => {
			dispatch({
				type: USER_PROFILE_DATA_UPDATING_ERROR,
				payload: error
			})
		})
		*/
	}
}

	export function updateNotified(){
		return {
			type: USER_PROFILE_DATA_UPDATED_AND_NOTIFIED,
			payload: true
		}
	}