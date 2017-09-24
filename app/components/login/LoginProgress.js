import React from 'react'
import {View, Text, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import * as LoginActions from '../../actions/loginActions'
import * as userActions from '../../actions/userActions'
import {UserLoginActionTypes} from '../../common/Enums'

import Button from '../common/controlls/Button'

import {FormElementProperties, ContainerProperties, ScaleProperties, CommonProperties} from '../../common/StyleConstants'

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

class LoginProgress extends React.Component{

	constructor(props) {
		super(props);
		
	}

	// componentDidMount(){
	// 	this.props.dispatch(userActions.getProfileDate())
	// }

	componentWillMount(){
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}

	onNavigatorEvent(event) {
		//To remove the loader from screen stack when comming from a back button
	    switch(event.id) {
	    	case 'willAppear':
	    		this.props.navigator.pop({
				  animated: true, // does the pop have transition animation or does it happen immediately (optional)
				  animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
				});
	    		console.log('Appear')
	       		break;
	      	case 'didAppear':
	        	break;
	      	case 'willDisappear':
	        	break;
	      	case 'didDisappear':
	        	break;
		}
	}

	goBackToLogin() {
		this.props.dispatch(LoginActions.goBackToLogin());
	}

	reSendTheVarificationEmail(){
		this.props.dispatch(LoginActions.reSendVarification(firebase));
	}

	logOut(){
		this.props.dispatch(LoginActions.logOut(firebase));
	}

	render(){

		console.log("CURRENT STATSUSSSSSSSSSSSSSSSSSSSS-", this.props.stateDescription)
		let screenContent = {};
		let loadingMessage = <Text style={styles.loadingText}></Text>
		let animatingStatus = false;


		if ( this.props.stateDescription === AUTHENTICATING ) {
			loadingMessage = <Text style={styles.loadingText}>Logging in...</Text>
  			animatingStatus = true;
		} else if ( this.props.stateDescription === USER_ACCOUNT_CREATING ) {
			loadingMessage = <Text style={styles.loadingText}>Your account is being created...</Text>
  			animatingStatus = true;
		} else if ( this.props.stateDescription === AUTHENTICATED && this.props.userVarificationStatus ) {
				this.props.dispatch(userActions.getProfileDate());
				this.props.navigator.push({
	  				screen: 'FBLogin.Game.Welcome',
	  				title: '',
	  				animated: 'false',
			  		animationType: 'slide-horizontal',
			  		passProps: {},
			  		navigatorStyle: {navBarHidden:true}
	  			})
		} else if ( this.props.stateDescription === RESENDING_VARIFICATION ) {
			loadingMessage = <Text style={styles.loadingText}>Re-sending varification email.</Text>

  			animatingStatus = true;
		} else if( this.props.stateDescription === RESENT_VARIFICATION ) {

			loadingMessage = <View style={styles.loadingContainer}>

								<Text style={styles.loadingText}>Please check your email and varify brefore login again.</Text>

								<Button 
									buttonStyle={{alignSelf:'stretch'}}
									buttonTextStyle={{}}
									isDisabled={false}
									buttonText={"Logout"} 
									eventHandler={this.logOut.bind(this)}>
								</Button>
							 </View>

  			animatingStatus = false;
  		} else if ( this.props.stateDescription === AUTHENTICATED && !this.props.userVarificationStatus ) {

			loadingMessage = <View style={styles.loadingContainer}>

								<Text style={styles.loadingText}>Email address of your account is not varified yet.</Text>

								<Button 
									buttonStyle={{alignSelf:'stretch', marginBottom:10}}
									isDisabled={false}
									buttonText={"Re-send varification email"} 
									eventHandler={this.reSendTheVarificationEmail.bind(this)}>
								</Button>

								<Button 
									buttonStyle={{alignSelf:'stretch'}}
									isDisabled={false}
									buttonText={"Logout"} 
									eventHandler={this.logOut.bind(this)}>
								</Button>

							 </View>

  			animatingStatus = false;
				
			
		} else if ( this.props.stateDescription === USER_ACCOUNT_CREATED ) {

			loadingMessage = <View style={styles.loadingContainer}>

								<Text style={styles.loadingText}>Your account is successfully created and the varification email is sent to your account.
								Please varify your email first and login again.
								</Text>

								<Button 
									buttonStyle={{alignSelf:'stretch'}}
									isDisabled={false}
									buttonText={"Logout"} 
									eventHandler={this.logOut.bind(this)}>
								</Button>

							 </View>

  			animatingStatus = false;

	  	}  else if ( this.props.stateDescription === USER_LOGGING_OUT ) {
			loadingMessage = <Text style={styles.loadingText}>Re-sending varification email.</Text>
  			animatingStatus = true;
		} else if ( this.props.stateDescription === BACK_TO_LOGIN ) {
			//console.log("Getting clode the loader");
			this.props.navigator.popToRoot({
			  animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
			  animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
			});

		} else if ( this.props.stateDescription === USER_LOGGED_OUT ) {
			this.props.navigator.popToRoot({
			  animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
			  animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
			});		
		}
		else if ( this.props.stateDescription === AUTHENTICATION_ERROR || this.props.stateDescription === USER_ACCOUNT_CREATION_ERROR ) {

			loadingMessage = <View style={styles.loadingContainer}>

								<Text style={styles.loadingText}>Incorrect email address or password entered.</Text>

								<Button 
									buttonStyle={{alignSelf:'stretch'}}
									isDisabled={false}
									buttonText={"Back"} 
									eventHandler={this.goBackToLogin.bind(this)}>
								</Button>

							 </View>

  			animatingStatus = false;

		}

		

		return(
			<View style={styles.loadingContainer}>
				<ActivityIndicator size={60} animating={animatingStatus} color={CommonProperties.textColor} />
				<View style={styles.messageContainer}>
					{loadingMessage}
				</View>
			</View>
		)
	}

}

const storeProps = (store) => ({
	stateDescription: store.login.stateDescription,
	userVarificationStatus: store.login.userVarificationStatus,
	error: store.login.error,
})

export default connect(storeProps)(LoginProgress);

const styles = {
	loadingContainer: {
		flex:1, 
		backgroundColor: ContainerProperties.backgroundColor, 
		justifyContent:'center', 
		alignItems:'center',
		//backgroundColor: 'pink'
	},
	loadingText : {
		color: CommonProperties.textColor,
		fontSize: ScaleProperties.fontSizeX,
		textAlign: 'center',
		marginBottom: CommonProperties.elementMarginBottom,
	},
	messageContainer : {
		paddingLeft: CommonProperties.screenPadding,
		paddingRight: CommonProperties.screenPadding,

	},
	loadingButton : {
		//flex: 1,
		minHeight: CommonProperties.inputElementMinHeightX,
		borderWidth: 2,
		borderStyle: 'solid',
		alignSelf: 'stretch',
		borderColor: CommonProperties.borderColor,
		borderRadius: 5,
		backgroundColor: FormElementProperties.buttonBackgroundColor,
		justifyContent:'center',
		marginBottom: CommonProperties.elementMarginBottom
	},
	loadingButtonText : {
		
		fontSize: ScaleProperties.fontSizeX,
		color: CommonProperties.textColor,
		padding:3,
		alignSelf:'center',
	}
}

