import React from 'react'
import {Text, TextInput, TouchableOpacity, View, StyleSheet, Image, ScrollView, Animated, Easing, KeyboardAvoidingView} from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import LogoIcon from '../common/icons/Logo'

import {UserLoginProcessStatus} from '../../common/Enums'
import {FormElementProperties, ContainerProperties, ScaleProperties, CommonProperties} from '../../common/StyleConstants'

import { inputEmail, inputPassword, createUser, loginEmptyInputError, enableLoginInput } from '../../actions/loginActions'
import ImageControl from '../common/Image'
// @connect((store)=>{
// 	return {
// 		inputEmail : store.login.inputEmail,
// 		inputPassword : store.login.inputPassword,
// 		test : 'Welcome to redux'
// 	};
// })


class CreateAccount extends React.Component{

	constructor(){
		super();
		this.spinValue = new Animated.Value(0)

	}

	componentDidMount(){
		this.logoSpin()
	}

	logoSpin(){
		this.spinValue.setValue(0);
		Animated.timing(
			this.spinValue,
			{
				toValue: 1,
				duration: 100000,
				easing: Easing.linear,
				useNativeDriver: true,
			}
		).start(()=>this.logoSpin())
	}

	didUpdateDimensions(){
		console.log("Dimention changed");
	}

	checkEnableLoginInput(email = this.props.email, password = this.props.password){
		if(email!=="" &&  password!=="")
			return true;
		else
			return false;
	}

	handleEmailInput (textValue){
  		const loginButtonStatus = this.checkEnableLoginInput(textValue,undefined);
  		this.props.dispatch(enableLoginInput(loginButtonStatus))
  	}

  	handlePasswordInput (textValue){
  		const loginButtonStatus = this.checkEnableLoginInput(undefined,textValue);
  		this.props.dispatch(enableLoginInput(loginButtonStatus))
  	}

  	handleCreateAccount () {
  		const email = this.props.email
  		const password = this.props.password

  		// if(email === "" || password === "")
  		// 	this.props.dispatch(loginInputError())
  		// else
  			this.props.dispatch(createUser(email,password));

  	}

	render(){
		const logoSpin = this.spinValue.interpolate({
			inputRange: [0,1],
			outputRange: ['0deg', '360deg']
		})

		const loginButtonText = {	
			fontSize: ScaleProperties.fontSizeX,
			color: FormElementProperties.buttonTextColor,
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

		//const loginStatus = this.props.authenticating || this.props.authenticated;
		let loginMessage = '';
		if(this.props.userStatus === UserLoginProcessStatus.AUTHENTICATING){
			loginMessage = 'User Authenticating'

			this.props.navigator.push({
  				screen: 'FBLogin.LoginProgress',
  				title: '',
  				animated: 'false',
		  		animationType: 'slide-horizontal',
		  		navigatorStyle: {navBarHidden:true}
  			})

		}
		// else if (this.props.error)
		// 	loginMessage = this.props.error.message
		// else
		// 	loginMessage = "Waiting for authentication"

		return(
			
			<View style={styles.viewContainer}>
				
				<ScrollView>
				<KeyboardAvoidingView behavior={"padding"} >
					<View style={styles.logoContainer}>
						<View style={styles.logoContent}>
							<Animated.View style={styles.logo}><LogoIcon /></Animated.View>
							<Text style={styles.logoText}>PuzzlePRO</Text>
						</View>
					</View>
					<View style={styles.inputContainer}>
						<TextInput onLayout={(event)=>{console.log("CCCCCCCCCCCCCCCCCCCCCCCCCC",event.nativeEvent.layout.width)}}  selectionColor={FormElementProperties.textInputSelectionColor} underlineColorAndroid={FormElementProperties.textInputSelectionColor} onChangeText={this.handleEmailInput.bind(this)} style={styles.loginText} placeholder={"Email Address"} placeholderTextColor={FormElementProperties.textInputPlaceholderColor} keyboardType="email-address" value={this.props.email}/>
					</View>
					<View style={styles.inputContainer}>
						<TextInput selectionColor={FormElementProperties.textInputSelectionColor} underlineColorAndroid={FormElementProperties.textInputSelectionColor} secureTextEntry={true} autoCorrect={false} onChangeText={this.handlePasswordInput.bind(this)} style={styles.loginText} placeholder={"Password"} placeholderTextColor={FormElementProperties.textInputPlaceholderColor} value={this.props.password}/>
					</View>
					<View style={styles.inputContainer}>
						
							<TouchableOpacity onPress={this.handleCreateAccount.bind(this)} style={{...inputButtonContainer}} disabled={this.props.loginButtonDisabled}>
								<Text  style={{...loginButtonText}}>Create Account</Text>
								
							</TouchableOpacity>
						
					</View>
				</KeyboardAvoidingView>
				</ScrollView>
			</View>
			
		)
	}
}

// const eventDispatch = (dispatch)=>({

//   	handleEmailInput : (textValue) => {
//   		console.log(textValue);
//   		dispatch(inputEmail(textValue));
//   	},

//   	handlePasswordInput : (textValue) => {
//   		dispatch(inputPassword(textValue));	
//   	},

//   	handleLogin : (email,password) => {
//   		dispatch(loginOrCreateUser(email,password));

//   	}
//   })

const storeProps = (store)=>({
    test : 'Welcome to redux',
    email : store.login.inputEmail,
    password : store.login.inputPassword,
    userStatus: store.login.userStatus,
    error: store.login.error,
    errorAnim: store.login.errorAnim,
    emptyInputError: store.login.emptyInputError,
    loginButtonDisabled: store.login.loginButtonDisabled
  })

//export default connect(storeProps, eventDispatch)(Login)
export default connect(storeProps)(CreateAccount)

const styles = StyleSheet.create({
	viewContainer : {
		backgroundColor: ContainerProperties.backgroundColor,
		flex: 1,
		//borderWidth: 5,
		//borderColor: '#fff',
		//borderStyle: 'solid',
		justifyContent: 'center',
		padding:20
	},
	logoContainer: {
		alignItems:'center', 
		justifyContent:'center'
	},
	logoContent: {
		//flex: 2,
		//minHeight:50,
		maxHeight:ScaleProperties.logoHeight,
		backgroundColor:  ContainerProperties.backgroundColor,
		//display:'none'
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent:'space-around',
		maxWidth: ScaleProperties.logoWidth,
		//paddingLeft: 20,
		//paddingRight: 20,
		//marginBottom:10, paddingTop:10,
		//backgroundColor: 'green',

	},
	subContainer : {
		//flex: 1,
		//alignItems: 'flex-end',
		//justifyContent: 'space-around',
		//flexDirection: 'column',
		//backgroundColor: 'pink',
		//justifyContent: 'center',
		//alignItems: 'center',
		//alignSelf: 'stretch'
	},
	inputContainer: {
		//flex: 1,
		minHeight:60,
		
		//maxHeight:250,
		marginBottom: 10,
		marginLeft: 5,
		marginRight: 5,
	},
	loginText : { 
		color: FormElementProperties.textInputTextColor,
		fontSize: ScaleProperties.fontSizeX,
		flex: 1,
		//color:'red'

	},
	
	
	messageText : {
		//fontSize : 20,
		color: 'red'
	},
	logoText: {
		fontSize: ScaleProperties.fontSizeXX, 
		color: CommonProperties.logoColor, 
		textAlign:'center',
		//transform: [{translateX: -10}],
		
	},
	logo: {
		transform: [{rotateY: '30deg'}],
	}
})