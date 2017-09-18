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
		USER_PROFILE_DATA_UPDATING_ERROR
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

export function setBirthday(dateOfBirth){
	return {
		type: SET_USER_BIRTHDAY,
		payload: dateOfBirth
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
				console.log(snapshot.val().displayName);
				dispatch({
					type: USER_PROFILE_DATA_RECEIVED , 
					payload: {
								displayName: snapshot.val().displayName, 
								gender: snapshot.val().gender, 
								dateOfBirth: snapshot.val().dateOfBirth
							}
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


export function updateProfile(profile, db) {
	return (dispatch) => {
		dispatch({
			type: UPDATING_USER_PROFILE_DATA
		})
		
		const PuzzleLR = db.ref().child("PuzzleLR");
		const userProfile = db.ref().child("UserProfile");
		const primaryKey = profile.uid;

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
				type: USER_PROFILE_DATA_UPDATING_ERROR
			})
		})
		
	}
}