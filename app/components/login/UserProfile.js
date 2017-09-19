import React from 'react'
import {TextInput, Text, View, StyleSheet, TouchableOpacity, Picker, DatePickerAndroid, TouchableHighlight, KeyboardAvoidingView, ScrollView} from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import moment from 'moment'

import CalendarIcon from '../common/icons/Calendar'
import GenderIcon from '../common/icons/Gender'
import Button from '../common/controlls/Button'

import { FormElementProperties, ContainerProperties, ScaleProperties, CommonProperties } from '../../common/StyleConstants'

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
		const defaultEditControlStyle = {
			color: FormElementProperties.textInputPlaceholderColor,
			fontSize: ScaleProperties.fontSizeX,
		}

		const inputButtonContainer = {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: FormElementProperties.buttonBackgroundColor,
			borderRadius: 10,
			borderWidth: FormElementProperties.buttonBorderWidth,
			borderColor: CommonProperties.borderColor,
			borderStyle: 'solid',
		}
		const loginButtonText = {	
			fontSize: ScaleProperties.fontSizeX,
			color: FormElementProperties.buttonTextColor,
		}

		if(this.props.gender!=="Gender"){
			styleAfterEditGender = {color: FormElementProperties.textInputTextColor}
			console.log("Inside IF")
		}
		if(this.props.dateOfBirth!=="Date Of Birth")
			styleAfterEditDoB = {color: FormElementProperties.textInputTextColor}

		return(
			<ScrollView style={styles.profileContainer}>
				
				<KeyboardAvoidingView style={styles.profileData} behavior={"padding"}>
					<View style={styles.inputContainer}>
						<TextInput 
							style={styles.inputText} 
							selectionColor={FormElementProperties.textInputSelectionColor} 
							underlineColorAndroid={FormElementProperties.textInputSelectionColor} 
							placeholder={"Name"} 
							placeholderTextColor={FormElementProperties.textInputPlaceholderColor}  
							value={this.props.displayName}  
							onChangeText={this.changeDisplayName.bind(this)}>
						</TextInput>
					</View>
					<View style={styles.customInputContainer}>
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
					<View style={styles.customInputContainer}>
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
					<View>
						<Button 
							buttonStyle={{marginBottom:10}}
							buttonTextStyle={{}}
							isDisabled={false}
							buttonText={"Update"} 
							eventHandler={this.handleUpdate.bind(this)}>
						</Button>
					</View>
					<View>
						<Button 
							isDisabled={false}
							buttonText={"Cancel"} 
							eventHandler={this.handleClose.bind(this)}>
						</Button>
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
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
		//flex: 1,
		backgroundColor: ContainerProperties.backgroundColor,
		padding:10
	},
	profileImage: {
		backgroundColor: 'yellow',
		//width:200,
		minHeight:40,
		//flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	profileData: {
		//flex: 3,
		backgroundColor: ContainerProperties.backgroundColor,
		//justifyContent:'space-between',

	},
	profileName: {
		//flex:1,
		//marginBottom:5, 
		marginTop:5,
		//backgroundColor:'green',
		minHeight: 20,
		justifyContent:'flex-end'
	},
	profileDob: {
		//flex:1,
		flexDirection: 'row', 
		justifyContent:'space-between',
		//marginBottom:5, 
		//marginTop:5, 
		marginLeft:5, 
		marginRight:5, 
		borderBottomWidth:2, 
		borderColor: CommonProperties.borderColor,
		minHeight: FormElementProperties.inputElementMinHeightX,
	},
	profileGender: {
		//flex:1,
		flexDirection: 'row', 
		marginLeft:5, 
		marginRight:5, 
		//marginBottom:5, 
		//marginTop:5, 
		borderBottomWidth:2, 
		borderColor: CommonProperties.borderColor,
		//alignItems:'stretch',
		justifyContent:'space-between',
		minHeight: FormElementProperties.inputElementMinHeightX,
		//backgroundColor:'pink'

	},
	inputText: {
		flex:1,
		color: FormElementProperties.textInputTextColor,
		fontSize: ScaleProperties.fontSizeX,
		minHeight: FormElementProperties.inputElementMinHeightX,
	},
	profileUpdate: {
		//flex:1,
		alignItems:'stretch',
		justifyContent:'center',
		marginTop:2,
		height: FormElementProperties.inputElementMinHeightX
	},
	profileCancel: {
		//flex:1,
		alignItems:'stretch',
		justifyContent:'center',
		marginTop:2,
		height: FormElementProperties.inputElementMinHeightX
	},
	inputContainer: {
		marginLeft:5, 
		marginRight:5, 
		minHeight: CommonProperties.inputElementMinHeightX,
		marginBottom:10,
	},
	customInputContainer: {
		flexDirection: 'row', 
		marginLeft:5, 
		marginRight:5, 
		borderBottomWidth:1, 
		borderColor: CommonProperties.borderColor,
		justifyContent:'space-between',
		minHeight: FormElementProperties.inputElementMinHeightX,
		marginBottom: 10
	},
})
