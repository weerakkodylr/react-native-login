import React from 'react'
import { TextInput, Text, View, StyleSheet, TouchableOpacity, Picker, DatePickerAndroid, TouchableHighlight, KeyboardAvoidingView, ScrollView, Dimensions, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import moment from 'moment'
import { UserDataActionTypes, OverlayProgressStatus } from '../../common/Enums'
import CalendarIcon from '../common/icons/Calendar'
import GenderIcon from '../common/icons/Gender'
import Button from '../common/controlls/Button'
import OverlayMessages from '../common/controlls/OverlayMessages'

import { FormElementProperties, ContainerProperties, ScaleProperties, CommonProperties, Colors } from '../../common/StyleConstants'

import * as profileActions from '../../actions/userActions'
import * as layoutActions from '../../actions/layoutActions'

const { 
		UPDATING_USER_PROFILE_DATA,
		USER_PROFILE_DATA_UPDATED,
		USER_PROFILE_DATA_UPDATING_ERROR,
		USER_PROFILE_DATA_UPDATED_AND_NOTIFIED,

		REQUESTING_USER_PROFILE_DATA,
		USER_PROFILE_DATA_RECEIVED,
		USER_PROFILE_DATA_RECEIVING_ERROR,
	  } = UserDataActionTypes

const { 
		LOADINGDATA,
		DATALOADED,
		ERROR,
		UPDATINGDATA,
		DATAUPDATED
	  } = OverlayProgressStatus

const overlayContentMapper = {
		UPDATING_USER_PROFILE_DATA: UPDATINGDATA,
		USER_PROFILE_DATA_UPDATED: DATAUPDATED,
		USER_PROFILE_DATA_UPDATING_ERROR: ERROR,
		USER_PROFILE_DATA_RECEIVED: DATALOADED,
		USER_PROFILE_DATA_RECEIVING_ERROR: ERROR
}

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
		  passProps: {
		  	dispatch: this.props.dispatch, 
		  	action: profileActions.setUserGender, 
		  	currentSelection : this.props.gender, 
		  	listViewData: [{optionKey: 'Male', optionValue:'Male'},{optionKey: 'Female', optionValue:'Female'}]
		  }, // simple serializable object that will pass as props to the modal (optional)
		  navigatorStyle: {navBarHidden:true}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
		  // style: {
		  //   backgroundBlur: "light", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
		  //   backgroundColor: "#ffffff90", // tint color for the background, you can specify alpha here (optional)
		  //   tapBackgroundToDismiss: true // dismisses LightBox on background taps (optional)
		  // }
		});
	}

	handleClose = () => {
		console.log('close PRessed')
		this.props.navigator.pop({
		  animated: true, // does the pop have transition animation or does it happen immediately (optional)
		  animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
		});
	}

	onLayoutChnage(){
		const {height, width} = Dimensions.get('window');
		this.props.dispatch(layoutActions.setLayoutDimentions(width, height))
	}

	render(){
		//console.log(this.props)

		let styleAfterEditGender = {}
		let styleAfterEditDoB = {}
		//const isOverlayDisplayStatus = this.props.stateDescription === UPDATING_USER_PROFILE_DATA || this.props.stateDescription === USER_PROFILE_DATA_UPDATING_ERROR || this.props.stateDescription === USER_PROFILE_DATA_UPDATED

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

		let overlayElement = <Text></Text>
		let passingState = "DATALOADED"
		if( !this.props.displayName ) {
			passingState = LOADINGDATA
			overlayElement = <OverlayMessages stateDescription={LOADINGDATA}/>
		} else if( this.props.stateDescription === USER_PROFILE_DATA_UPDATED_AND_NOTIFIED ){
			overlayElement = <Text></Text>
		} else if ( 
				this.props.stateDescription === UPDATING_USER_PROFILE_DATA || 
				this.props.stateDescription === USER_PROFILE_DATA_UPDATING_ERROR || 
				this.props.stateDescription === USER_PROFILE_DATA_UPDATED ||
				this.props.stateDescription === USER_PROFILE_DATA_RECEIVING_ERROR
				) {
			passingState = overlayContentMapper[this.props.stateDescription]
			//overlayElement = <OverlayMessages stateDescription={}/>
			if (this.props.stateDescription === USER_PROFILE_DATA_UPDATED || this.props.stateDescription === USER_PROFILE_DATA_RECEIVED) {
				setTimeout(()=>{
					console.log("SET TIMEOUT CALLED")
					this.props.dispatch(profileActions.updateNotified())
				},2500)
			}
			overlayElement = <OverlayMessages stateDescription={passingState} overlaySize={{height: this.props.layoutHeight, width: this.props.layoutWidth}}/>
		}  

		
		if(this.props.gender!=="Gender"){
			styleAfterEditGender = {color: FormElementProperties.textInputTextColor}
			console.log("Inside IF")
		}
		if(this.props.dateOfBirth!=="Date Of Birth")
			styleAfterEditDoB = {color: FormElementProperties.textInputTextColor}


		return(
			<View style={styles.containerView}>
				<ScrollView style={styles.profileContainer} onLayout={this.onLayoutChnage.bind(this)}  >
					
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
				{overlayElement}
			</View>
		)
	}
}

const MessageOverlay = (props) => (
	<View style={{flex:1,position: 'absolute', left: 0, top: 0,}}>
		<View style={props.overlayStyle}>
		</View>
		<View style={props.overlayMessageViewStyle}>
			{props.messageText}
		</View>
	</View>
)

const storeProps = (store)=>({
    displayName : store.user.displayName,
    email : store.user.email,
    gender : store.user.gender,
    dateOfBirth: store.user.dateOfBirth,
    stateDescription: store.user.stateDescription,
    layoutWidth: store.layout.layoutWidth,
    layoutHeight: store.layout.layoutHeight,
    error: store.user.error
  })


export default connect(storeProps)(UserProfile);

const styles = StyleSheet.create({
	containerView: {
		flex: 1,
		backgroundColor: ContainerProperties.backgroundColor,
	},
	profileContainer: {
		backgroundColor: ContainerProperties.backgroundColor,
		padding:10,
		zIndex: 1
	},
	profileImage: {
		backgroundColor: 'yellow',
		minHeight:40,
		justifyContent: 'center',
		alignItems: 'center'
	},
	profileData: {
		backgroundColor: ContainerProperties.backgroundColor,
	},
	profileName: { 
		marginTop:5,
		minHeight: 20,
		justifyContent:'flex-end'
	},
	profileDob: {
		flexDirection: 'row', 
		justifyContent:'space-between',
		marginLeft:5, 
		marginRight:5, 
		borderBottomWidth: CommonProperties.borderWidth, 
		borderColor: CommonProperties.borderColor,
		minHeight: FormElementProperties.inputElementMinHeightX,
	},
	profileGender: {
		flexDirection: 'row', 
		marginLeft:5, 
		marginRight:5, 
		borderBottomWidth: CommonProperties.borderWidth, 
		borderColor: CommonProperties.borderColor,
		justifyContent:'space-between',
		minHeight: FormElementProperties.inputElementMinHeightX
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
