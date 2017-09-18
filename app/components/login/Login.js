import React from 'react'
import { Text, TextInput, View, StyleSheet, Image, ScrollView, Animated, Easing, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import LogoIcon from '../common/icons/Logo'
import Button from '../common/controlls/Button'
import { UserLoginActionTypes } from '../../common/Enums'
import { FormElementProperties, ContainerProperties, ScaleProperties, CommonProperties } from '../../common/StyleConstants'
import { inputEmail, inputPassword, loginUser, createAccount, loginEmptyInputError, enableLoginInput, showCreateAccount } from '../../actions/loginActions'

const { AUTHENTICATING } = UserLoginActionTypes

class Login extends React.Component{

	constructor(){
		super();
		this.spinValue = new Animated.Value(0)
		this.moveAway = new Animated.Value(1)
		this.passwordConfirmation = ""
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

	elementMoveAway(){

		Animated.spring(
			this.moveAway,
			{
				toValue: 0,
				bounciness: 20,
				speed: 5,
				useNativeDriver: true
			}
		).start()
	}

	didUpdateDimensions(){
		console.log("Dimention changed");
	}

	validateEmail(email){
		const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return regEx.test(email);
	}

	checkEnableLoginInput(email = this.props.email, password = this.props.password){
		this.validateEmail(email)
		if(email!=="" &&  password!=="" && this.validateEmail(email) && (password===this.passwordConfirmation || !this.props.createAccount))
			return true;
		else
			return false;
	}

	handleEmailInput (textValue){
  		this.props.dispatch(inputEmail(textValue));

  		const loginButtonStatus = this.checkEnableLoginInput(textValue,undefined);
  		this.props.dispatch(enableLoginInput(loginButtonStatus))
  	}

  	handlePasswordInput (textValue){
  		this.props.dispatch(inputPassword(textValue));	

  		const loginButtonStatus = this.checkEnableLoginInput(undefined,textValue);
  		this.props.dispatch(enableLoginInput(loginButtonStatus))
  	}

  	handleLoginUser() {
  		const email = this.props.email
  		const password = this.props.password
		this.props.dispatch(loginUser(email,password,firebase));

  	}

  	handlePasswordConfirmation(textValue){
  		this.passwordConfirmation = textValue

  		const loginButtonStatus = this.checkEnableLoginInput();
  		this.props.dispatch(enableLoginInput(loginButtonStatus))
  	}

  	goToCreateAccount(){

		if(!this.props.createAccount)
			this.props.dispatch(showCreateAccount(true));
		else{
			const email = this.props.email
  			const password = this.props.password
			this.props.dispatch(createAccount(email,password,firebase));
		}
			
  	}

  	goBackToLogin(){
		this.props.dispatch(showCreateAccount(false));
  	}

	render(){
		const isCreateAccount = this.props.createAccount || false;
		const conditionalBorderColorLogin = (this.props.loginButtonDisabled? CommonProperties.disabledColor : CommonProperties.borderColor);
		const conditionalTextColorLogin = (this.props.loginButtonDisabled? CommonProperties.disabledColor : FormElementProperties.buttonTextColor)
		const conditionalBorderColorCreateAccount = (this.props.loginButtonDisabled && isCreateAccount? CommonProperties.disabledColor : CommonProperties.borderColor)
		const conditionalTextColorCreateAccount = (this.props.loginButtonDisabled && isCreateAccount? CommonProperties.disabledColor : FormElementProperties.buttonTextColor)
		const logoSpin = this.spinValue.interpolate({
			inputRange: [0,1],
			outputRange: ['0deg', '360deg']
		})

		let loginMessage = '';
		let loginButton = <Button 
								buttonContainerStyle={{marginBottom:10}}
								buttonStyle={{borderColor: conditionalBorderColorLogin}}
								buttonTextStyle={{color: conditionalTextColorLogin}}
								isDisabled={this.props.loginButtonDisabled}
								buttonText={"Login"} 
								eventHandler={this.handleLoginUser.bind(this)}>
							</Button>

		let confirmPassword = <View style={styles.inputContainer}>
								<TextInput 
									selectionColor={FormElementProperties.textInputSelectionColor} 
									underlineColorAndroid={FormElementProperties.textInputSelectionColor} 
									secureTextEntry={true} 
									autoCorrect={false} 
									onChangeText={this.handlePasswordConfirmation.bind(this)} 
									style={styles.loginText} placeholder={"Confirm Password"} 
									placeholderTextColor={FormElementProperties.textInputPlaceholderColor}>
								</TextInput>
							  </View>

		let goBackToLoginButton = <Button 
										buttonContainerStyle={{marginBottom:10}}
										buttonStyle={{}}
										buttonTextStyle={{}}
										isDisabled={false}
										buttonText={"Login with existing account"} 
										eventHandler={this.goBackToLogin.bind(this)}>
									</Button>


		if(this.props.stateDescription === UserLoginActionTypes.AUTHENTICATING || this.props.stateDescription === UserLoginActionTypes.USER_ACCOUNT_CREATING ){
			loginMessage = 'User Authenticating'

			this.props.navigator.push({
  				screen: 'FBLogin.LoginProgress',
  				title: '',
  				animated: 'false',
		  		animationType: 'slide-horizontal',
		  		navigatorStyle: {navBarHidden:true}
  			})
		}

		if(isCreateAccount){
			loginButton = <View></View>

		} else {
			confirmPassword = <View></View>
			goBackToLoginButton = <View></View>
		}


		return(
			
			<View style={styles.viewContainer}>
				
				<ScrollView style={styles.subContainer}>
				<KeyboardAvoidingView behavior={"padding"} >
					<View style={styles.logoContainer}>
						<View style={styles.logoContent}>
							<Animated.View style={styles.logo}><LogoIcon /></Animated.View>
							<Text style={styles.logoText}>PuzzlePRO</Text>
						</View>
					</View>
					<View style={styles.inputContainer}>
						<TextInput 
							onLayout={(event)=>{console.log("CCCCCCCCCCCCCCCCCCCCCCCCCC",event.nativeEvent.layout.width)}}  
							selectionColor={FormElementProperties.textInputSelectionColor} 
							underlineColorAndroid={FormElementProperties.textInputSelectionColor} 
							onChangeText={this.handleEmailInput.bind(this)} style={styles.loginText} 
							placeholder={"Email Address"} 
							placeholderTextColor={FormElementProperties.textInputPlaceholderColor} 
							keyboardType="email-address" 
							value={this.props.email}>
						</TextInput>
					</View>
					<View style={styles.inputContainer}>
						<TextInput 
							selectionColor={FormElementProperties.textInputSelectionColor} 
							underlineColorAndroid={FormElementProperties.textInputSelectionColor} 
							secureTextEntry={true} 
							autoCorrect={false} 
							onChangeText={this.handlePasswordInput.bind(this)} 
							style={styles.loginText} placeholder={"Password"} 
							placeholderTextColor={FormElementProperties.textInputPlaceholderColor} 
							value={this.props.password}>
						</TextInput>
					</View>
					{confirmPassword}
					{loginButton}

					<Button 
						buttonContainerStyle={{marginBottom:10}}
						buttonStyle={{borderColor: conditionalBorderColorCreateAccount}}
						buttonTextStyle={{color: conditionalTextColorCreateAccount}}
						eventHandler={this.goToCreateAccount.bind(this)} 
						buttonText={"Create Account"} 
						isDisabled={(isCreateAccount && this.props.loginButtonDisabled)}>
					</Button>
						
					{goBackToLoginButton}
				</KeyboardAvoidingView>
				</ScrollView>
			</View>
			
		)
	}
}

const storeProps = (store)=>({
    email : store.login.inputEmail,
    password : store.login.inputPassword,
    stateDescription: store.login.stateDescription,
	userVarificationStatus: store.login.userVarificationStatus,
    error: store.login.error,
    loginButtonDisabled: store.login.loginButtonDisabled,
    createAccount: store.login.createAccount
  })

export default connect(storeProps)(Login)

const styles = StyleSheet.create({
	viewContainer : {
		backgroundColor: ContainerProperties.backgroundColor,
		flex: 1,
		justifyContent: 'center',
	},
	logoContainer: {
		alignItems:'center', 
		justifyContent:'center'
	},
	logoContent: {
		maxHeight:ScaleProperties.logoHeight,
		backgroundColor:  ContainerProperties.backgroundColor,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent:'space-around',
		maxWidth: ScaleProperties.logoWidth,
		paddingTop: CommonProperties.screenPadding,
	},
	subContainer : {
		paddingLeft: CommonProperties.screenPadding,
		paddingRight: CommonProperties.screenPadding,
	},
	inputContainer: {
		minHeight: CommonProperties.inputElementMinHeightX,
		marginBottom: CommonProperties.elementMarginBottom,
		marginLeft: 5,
		marginRight: 5,
	},
	loginText : { 
		color: FormElementProperties.textInputTextColor,
		fontSize: ScaleProperties.fontSizeX,
		flex: 1,
	},
	logoText: {
		fontSize: ScaleProperties.fontSizeXXX, 
		color: CommonProperties.logoColor, 
		textAlign:'center',
	},
	logo: {
		transform: [{rotateY: '30deg'}],
	}
})