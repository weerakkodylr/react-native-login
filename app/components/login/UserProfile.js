import React from 'react'
import {TextInput, Text, View, StyleSheet, TouchableOpacity, Picker, DatePickerAndroid, TouchableHighlight} from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import moment from 'moment'

import CalendarIcon from '../common/icons/Calendar'
import GenderIcon from '../common/icons/Gender'

import * as profileActions from '../../actions/userActions'

class UserProfile extends React.Component{

	constructor(){
		super();

		this.db = firebase.database();
		this.currentUser = {};
	}

	componentDidMount(){
		this.currentUser = firebase.auth().currentUser;
		// console.log("Name Is", currentUser.displayName);
		//this.props.dispatch(profileActions.setName(this.currentUser.displayName));


		
	}


	handleUpdate = () => {
		const db = this.db;
		this.props.dispatch(profileActions.updateProfile({displayName: this.props.displayName, email: this.props.email, gender: this.props.gender, dateOfBirth: this.props.dateOfBirth, uid:this.currentUser.uid}, db));
	}

	setBirthday = async () => {
		try {
		let storeDate = moment(this.props.dateOfBirth,"MM-DD-YYYY");
		  const {action, year, month, day} = await DatePickerAndroid.open({
		    // Use `new Date()` for current date.
		    // May 25 2020. Month 0 is January.
		    date: new Date(storeDate.year(),(storeDate.month() + 1),storeDate.date())
		  });
		  if (action !== DatePickerAndroid.dismissedAction) {
		    // Selected year, month (0-11), day
		    const selectedDate = moment({y:year,M:(month-1),d:day});
		    //console.log(year + '-' + month + '-' + day)
		    this.props.dispatch(profileActions.setBirthday(selectedDate.format("MM/DD/YYYY")));
		  }
		} catch ({code, message}) {
		  console.warn('Cannot open date picker', message);
		}
	}

	changeDisplayName = (displayName) => {
		this.props.dispatch(profileActions.setName(displayName));
	}

	selectGender = () => {
		this.props.navigator.showModal({
		  screen: "FBLogin.SelectDialog", // unique ID registered with Navigation.registerScreen
		  //title: "Select Gender", // title of the screen as appears in the nav bar (optional)
		  passProps: {
		  	dispatch: this.props.dispatch, 
		  	action: profileActions.setUserGender, 
		  	currentSelection : this.props.gender, 
		  	listViewData: [{optionKey: 'Male', optionValue:'Male'},{optionKey: 'Female', optionValue:'Female'}]
		  }, // simple serializable object that will pass as props to the modal (optional)
		  navigatorStyle: {navBarHidden:true}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
		 // navigatorButtons: {}, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
		  //animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
		  style: {
		    backgroundBlur: "light", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
		    backgroundColor: "#ffffff90", // tint color for the background, you can specify alpha here (optional)
		    tapBackgroundToDismiss: true // dismisses LightBox on background taps (optional)
		  }
		});
	}

	handleClose = () => {
		console.log('close PRessed')
		this.props.navigator.pop({
		  animated: true, // does the pop have transition animation or does it happen immediately (optional)
		  animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
		});
	}

	render(){
		//console.log(this.props)

		let styleAfterEditGender = {}
		let styleAfterEditDoB = {}
		const defaultEditControlStyle = {color:'#c6c6c6',fontSize:18}
		if(this.props.gender!=="Gender"){
			styleAfterEditGender = {color:'#2e8ea9'}
			console.log("Inside IF")
		}
		if(this.props.dateOfBirth!=="Date Of Birth")
			styleAfterEditDoB = {color:'#2e8ea9'}

		return(
			<View style={styles.profileContainer}>
				<View style={styles.profileImage}>
					<Text>Profile image goes here</Text>
				</View>
				<View style={styles.profileData}>
					<View style={styles.profileName}>
						<TextInput style={{fontSize:18, color:'#2e8ea9'}} placeholder="Name" placeholderTextColor="#c6c6c6" value={this.props.displayName}  onChangeText={this.changeDisplayName.bind(this)}/>
					</View>
					<View style={styles.profileGender}>
						<View style={{flexDirection: 'row',flex:1}}>
							<TouchableOpacity onPress={this.selectGender.bind(this)} style={{justifyContent:'flex-end',flex:1}}>
								<Text style={{...defaultEditControlStyle,...styleAfterEditGender}}>{this.props.gender}</Text>
							</TouchableOpacity>
						</View>
						<View style={{flexDirection: 'row',alignItems:'flex-end',paddingBottom:5}}>
							<TouchableOpacity onPress={this.selectGender.bind(this)}>
								<GenderIcon />
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.profileDob}>
						<View style={{flexDirection: 'row',flex:1}}>
							<TouchableOpacity onPress={this.setBirthday.bind(this)} style={{justifyContent:'flex-end',flex:1}}>
								<Text style={{...defaultEditControlStyle,...styleAfterEditDoB}}>{this.props.dateOfBirth}</Text>
							</TouchableOpacity>
						</View>
						<View style={{flexDirection: 'row',alignItems:'flex-end',paddingBottom:5}}>
							<TouchableOpacity onPress={this.setBirthday.bind(this)}>
								<CalendarIcon />
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.profileUpdate}>
						<TouchableOpacity style={{flex:1,backgroundColor:'#2e8ea9', justifyContent:'center',alignItems:'center', borderRadius:10}} onPress={this.handleUpdate.bind(this)} >
							<Text style={{fontSize:20, color:'#ffffff'}}>Update</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.profileCancel}>
						<TouchableOpacity style={{flex:1,backgroundColor:'#2e8ea9', justifyContent:'center',alignItems:'center', borderRadius:10}} onPress={this.handleClose.bind(this)} >
							<Text style={{fontSize:20, color:'#ffffff'}}>Cancel</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}
}

const storeProps = (store)=>({
    displayName : store.profile.displayName,
    email : store.profile.email,
    gender : store.profile.gender,
    dateOfBirth: store.profile.dateOfBirth,
  })


export default connect(storeProps)(UserProfile);

const styles = StyleSheet.create({
	profileContainer: {
		flex: 1,
		backgroundColor: 'pink',
		margin:5
	},
	profileImage: {
		backgroundColor: 'yellow',
		//width:200,
		minHeight:40,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	profileData: {
		flex: 3,
		backgroundColor: 'white',
		//justifyContent:'space-between',

	},
	profileName: {
		flex:1,
		//marginBottom:5, 
		marginTop:5,
		//backgroundColor:'green',
		minHeight: 20,
		justifyContent:'flex-end'
	},
	profileDob: {
		flex:1,
		flexDirection: 'row', 
		justifyContent:'space-between',
		//marginBottom:5, 
		//marginTop:5, 
		marginLeft:5, 
		marginRight:5, 
		borderBottomWidth:2, 
		borderColor:'#c6c6c6',
		minHeight: 20,
	},
	profileGender: {
		flex:1,
		flexDirection: 'row', 
		marginLeft:5, 
		marginRight:5, 
		//marginBottom:5, 
		//marginTop:5, 
		borderBottomWidth:2, 
		borderColor:'#c6c6c6',
		//alignItems:'stretch',
		justifyContent:'space-between',
		minHeight: 20,
		//backgroundColor:'pink'

	},
	profileUpdate: {
		flex:1,
		alignItems:'stretch',
		justifyContent:'center',
		marginTop:2,
		minHeight: 15,
	},
	profileCancel: {
		flex:1,
		alignItems:'stretch',
		justifyContent:'center',
		marginTop:2,
		minHeight: 15,
	}
})
