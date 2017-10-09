import React from 'react'
import { Text, TextInput, View, StyleSheet, Image, ScrollView, Animated, Easing, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import LogoIcon from '../../components/icons/Logo'
import Button from '../../components/controls/Button'
import { UserLoginActionTypes } from '../../common/Enums'
import { FormElementProperties, ContainerProperties, ScaleProperties, CommonProperties } from '../../common/StyleConstants'
import { inputEmail, inputPassword, loginUser, createAccount, loginEmptyInputError, enableLoginButton, showCreateAccount, enableCreateAccount, showForgotPassword, forgotPassword } from '../../actions/loginActions'

const { 
	AUTHENTICATING,
	USER_LOGGED_OUT,
	USER_ACCOUNT_CREATING,
	PASSWORD_RESET_EMAIL_SENDING,
	PASSWORD_RESET_EMAIL_SENT,
	PASSWORD_RESET_EMAIL_SENDING_ERROR,
	USER_ACCOUNT_CREATING_PASSWORD_LENGTH_ERROR
} = UserLoginActionTypes

class Login extends React.Component{

	constructor(){
		super();
		this.state = {
			forgotPasswordView: false,
			forgotPasswordButtonDisabled: true
		}
		this.spinValue = new Animated.Value(0)
		this.moveAway = new Animated.Value(1)
		this.passwordConfirmation = ""
	}

	componentDidMount(){
		this.logoSpin()
	}

	//This was needed since I tried to keep some ui login within the component state.
	//So then the reseting to default state is cannot be done in 1 go from the reduce since component also owns some part of the state
	componentWillReceiveProps(nextProp){
		if(nextProp.stateDescription !== this.props.stateDescription && nextProp.stateDescription === USER_LOGGED_OUT)
			this.setState({forgotPasswordView: false, forgotPasswordButtonDisabled: true})
	}

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
	    		console.log('Appear THE LOGIN SCREEN')
	       		break;
	      	case 'didAppear':
	        	break;
	      	case 'willDisappear':
	        	break;
	      	case 'didDisappear':
	        	break;
		}
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

	checkEnableLoginButton(email = this.props.email, password = this.props.password){
		this.validateEmail(email)
		if(email!=="" &&  password!=="" && this.validateEmail(email))
			return true;
		else
			return false;
	}

	checkEnableCreateAccountButton(email = this.props.email, password = this.props.password){
		
		if(email!=="" &&  password!=="" && this.validateEmail(email) && password===this.passwordConfirmation && this.props.createAccount)
			return true;
		else
			return false;
	}

	handleEmailInput (textValue){
  		this.props.dispatch(inputEmail(textValue));

  		const loginButtonStatus = this.props.createAccount? this.checkEnableCreateAccountButton() : this.checkEnableLoginButton(textValue,undefined);
  		this.props.dispatch(enableLoginButton(loginButtonStatus))

  		if(this.validateEmail(textValue))
  			this.setState({forgotPasswordButtonDisabled: false})
  		else
  			this.setState({forgotPasswordButtonDisabled: true})
  	}

  	handlePasswordInput (textValue){
  		this.props.dispatch(inputPassword(textValue));	

  		const loginButtonStatus = this.props.createAccount? this.checkEnableCreateAccountButton() : this.checkEnableLoginButton(undefined,textValue);
  		this.props.dispatch(enableLoginButton(loginButtonStatus))
  	}

  	handleLoginUser() {
  		const email = this.props.email
  		const password = this.props.password
		this.props.dispatch(loginUser(email,password,firebase));

  	}

  	handlePasswordConfirmation(textValue){
  		this.passwordConfirmation = textValue

  		const loginButtonStatus = this.checkEnableCreateAccountButton();
  		this.props.dispatch(enableCreateAccount(loginButtonStatus))
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

  	forgotPassword(){
  		if(!this.state.forgotPasswordView)
			this.setState({forgotPasswordView: true})
		else{
			const email = this.props.email
			this.props.dispatch(forgotPassword(email,firebase));
		}
  	}

  	goBackToLogin(){
		this.props.dispatch(showCreateAccount(false))
		this.setState({forgotPasswordView: false, forgotPasswordButtonDisabled: true})
		//this.props.dispatch(showForgotPassword(false))

  	}

	render(){
		const isCreateAccount = this.props.createAccount || false
		const isForgotPassword = this.state.forgotPasswordView || false
		const conditionalBorderColorLogin = (this.props.loginButtonDisabled? CommonProperties.disabledColor : CommonProperties.borderColor);
		const conditionalTextColorLogin = (this.props.loginButtonDisabled? CommonProperties.disabledColor : FormElementProperties.buttonTextColor)
		const conditionalBorderColorCreateAccount = (this.props.createButtonDisabled && isCreateAccount? CommonProperties.disabledColor : CommonProperties.borderColor)
		const conditionalTextColorCreateAccount = (this.props.createButtonDisabled && isCreateAccount? CommonProperties.disabledColor : FormElementProperties.buttonTextColor)
		const conditionalBorderColorForgotPassword = (this.state.forgotPasswordButtonDisabled && isForgotPassword? CommonProperties.disabledColor : CommonProperties.borderColor)
		const conditionalTextColorForgotPassword = (this.state.forgotPasswordButtonDisabled && isForgotPassword? CommonProperties.disabledColor : FormElementProperties.buttonTextColor)
		const logoSpin = this.spinValue.interpolate({
			inputRange: [0,1],
			outputRange: ['0deg', '360deg']
		})

		let forgotPasswordText = 'Forgot Password?'
		let loginButton = 	<View>
								<Button 
									buttonStyle={{borderColor: conditionalBorderColorLogin, marginBottom:10}}
									buttonTextStyle={{color: conditionalTextColorLogin}}
									isDisabled={this.props.loginButtonDisabled}
									buttonText={(this.props.reAuthenticateButtonText? this.props.reAuthenticateButtonText : "Login")} 
									eventHandler={this.handleLoginUser.bind(this)}>
								</Button>
							</View>

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

		let goBackToLoginButton = 	<View>
										<Button 
											buttonStyle={{marginBottom:10}}
											buttonTextStyle={{}}
											isDisabled={false}
											buttonText={"Login with existing account"} 
											eventHandler={this.goBackToLogin.bind(this)}>
										</Button>
									</View>

		let createAccountButton = <View>
									<Button 
										buttonStyle={{borderColor: conditionalBorderColorCreateAccount, marginBottom:10}}
										buttonTextStyle={{color: conditionalTextColorCreateAccount}}
										eventHandler={this.goToCreateAccount.bind(this)} 
										buttonText={"Create Account"} 
										isDisabled={(isCreateAccount && this.props.createButtonDisabled)}>
									</Button>
								</View>	
		let forgotPasswordButton = 	<View>
										<Button 
											buttonStyle={{marginBottom:10, borderColor: conditionalBorderColorForgotPassword}}
											buttonTextStyle={{color:conditionalTextColorForgotPassword}}
											isDisabled={this.state.forgotPasswordButtonDisabled && this.state.forgotPasswordView}
											buttonText={forgotPasswordText} 
											eventHandler={this.forgotPassword.bind(this)}>
										</Button>
									</View>

		let loginLogo = <View style={styles.logoContainer}>
							<View style={styles.logoContent}>
								<Animated.View style={styles.logo}><LogoIcon /></Animated.View>
								<Text style={styles.logoText}>PuzzlePRO</Text>
							</View>
						</View>

		let passwordInput = <View style={styles.inputContainer}>
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

		
		if(this.props.stateDescription === AUTHENTICATING || this.props.stateDescription === USER_ACCOUNT_CREATING || this.props.stateDescription === PASSWORD_RESET_EMAIL_SENDING || this.props.stateDescription === USER_ACCOUNT_CREATING_PASSWORD_LENGTH_ERROR){

			this.props.navigator.push({
  				screen: 'FBLogin.LoginProgress',
  				title: '',
  				animated: 'false',
  				passProps: {isReAuthenticate: (this.props.isReAuthenticate? true : false)},
		  		animationType: 'slide-horizontal',
		  		navigatorStyle: {navBarHidden:true}
  			})
		}

		if(isCreateAccount){
			loginButton = <View></View>
			forgotPasswordButton = <View></View>
		} else if(isForgotPassword){
			confirmPassword = <View></View>
			loginButton = <View></View>
			createAccountButton = <View></View>
			passwordInput = <View></View>
			forgotPasswordText = 'Request passwrod reset'
		} else {
			confirmPassword = <View></View>
			goBackToLoginButton = <View></View>
		}

		if(this.props.isReAuthenticate)
			createAccountButton = <View></View>

		if(this.props.reAuthenticateButtonText)
			loginLogo = <View></View>



		return(
			
			<View style={styles.viewContainer}>
				
				<ScrollView style={styles.subContainer}>
				<KeyboardAvoidingView behavior={"padding"} >
					{loginLogo}
					<View style={styles.inputContainer}>
						<TextInput 
							onLayout={(event)=>{console.log("Layout Width",event.nativeEvent.layout.width)}}  
							selectionColor={FormElementProperties.textInputSelectionColor} 
							underlineColorAndroid={FormElementProperties.textInputSelectionColor} 
							onChangeText={this.handleEmailInput.bind(this)} style={styles.loginText} 
							placeholder={"Email Address"} 
							placeholderTextColor={FormElementProperties.textInputPlaceholderColor} 
							keyboardType="email-address" 
							value={this.props.email}>
						</TextInput>
					</View>
					{passwordInput}
					{confirmPassword}
					{loginButton}
					{createAccountButton}
					{forgotPasswordButton}
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
    createAccount: store.login.createAccount,
    createButtonDisabled: store.login.createButtonDisabled,
    //forgotPassword: store.login.forgotPassword,
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
		zIndex: 1
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