import React from 'react'
import { Text, TextInput, View, StyleSheet, Image, ScrollView, Animated, Easing, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import LogoIcon from '../common/icons/Logo'
import Button from '../common/controlls/Button'
import { OverlayProgressStatus } from '../../common/Enums'
import { FormElementProperties, ContainerProperties, ScaleProperties, CommonProperties,Colors } from '../../common/StyleConstants'
import { inputEmail, inputPassword, loginUser, createAccount, loginEmptyInputError, enableLoginInput, showCreateAccount } from '../../actions/loginActions'

const { 
		LOADINGDATA,
		DATALOADED,
		ERROR,
		UPDATINGDATA,
		DATAUPDATED
	  } = OverlayProgressStatus

const indicatorMessages = {
	LOADINGDATA: "Loading Data.",
	DATALOADED: "Successfully Loaded.",
	ERROR: "Error Occured.",
	UPDATINGDATA: "Updating Data.",
	DATAUPDATED: "Successfully Updated."
}

export default class test extends React.Component{
	constructor(){
		super()
		this.successPart1 = new Animated.Value(0)
		this.successPart2 = new Animated.Value(0)

		this.errorPart1 = new Animated.Value(0)
		this.errorPart2 = new Animated.Value(0)

		this.rotate = new Animated.Value(0)
	}

	componentDidMount(){
		this.successAnimation()
		this.rotateTest()
		this.errorAnimation()
	}

	successAnimation(){

		Animated.sequence([
			Animated.timing(
				this.successPart1,
				{
					toValue: 1,
					duration: 300,
					easing: Easing.linear,
					//useNativeDriver: true,
					delay: 400
				}
			),
			Animated.timing(
				this.successPart2,
				{
					toValue: 1,
					duration: 600,
					easing: Easing.linear,
					//useNativeDriver: true,
					delay: 0
				}
			)
		]).start()

		
	}

	errorAnimation(){

		Animated.sequence([
			Animated.timing(
				this.errorPart1,
				{
					toValue: 1,
					duration: 600,
					easing: Easing.linear,
					//useNativeDriver: true,
					delay: 400
				}
			),
			Animated.timing(
				this.errorPart2,
				{
					toValue: 1,
					duration: 600,
					easing: Easing.linear,
					//useNativeDriver: true,
					delay: 0
				}
			)
		]).start()

		
	}

	rotateTest(){
		this.rotate.setValue(0)
		Animated.timing(
				this.rotate,
				{
					toValue: 1,
					duration: 600,
					easing: Easing.linear,
					useNativeDriver: true,
					delay: 0
				}
			).start(() => this.rotateTest())
	}

	render(){	
		const part1 = this.successPart1.interpolate({
		    inputRange: [0, 1],
		    outputRange: [0, 15]
		  })

		const part2 = this.successPart2.interpolate({
		    inputRange: [0, 1],
		    outputRange: [0, 35]
		  })

		const errorPart1 = this.errorPart1.interpolate({
		    inputRange: [0, 1],
		    outputRange: [0, 36]
		  })

		const errorPart2 = this.errorPart2.interpolate({
		    inputRange: [0, 1],
		    outputRange: [0, 36]
		  })

		const rotateValue = this.rotate.interpolate({
		    inputRange: [0, 1],
		    outputRange: ['0deg', '360deg']
		  })

		let indicatorIcon = <Text></Text>
		let indicatorMessageText = indicatorMessages[LOADINGDATA]

		if( this.props.stateDescription === LOADINGDATA || this.props.stateDescription === UPDATINGDATA ) {
			indicatorIcon = <LoadingAnimation rotateValue={rotateValue}/>
		} else if( this.props.stateDescription === DATAUPDATED || this.props.stateDescription === DATAUPDATED ){
			indicatorIcon = <SuccessAnimation animationPart1Width = {part1} animationPart2Width = {part2}/>
		} else if ( this.props.stateDescription === ERROR || true)
			indicatorIcon = <ErrorAnimation animationPart1Width = {errorPart1} animationPart2Width = {errorPart2}/>


		return(
			<View style={{flex:1, backgroundColor:Colors.lightGreen,justifyContent:'center', alignItems:'center'}}>
				<View style={{backgroundColor:Colors.darkGreen, borderRadius:5, minWidth:200, minHeight:60, flexDirection:'column', borderWidth:2, borderStyle:'solid', borderColor: Colors.darkYellow, justifyContent:'center', alignItems:'center' }}>
					{indicatorIcon}
					<View style={{justifyContent:'center', alignItems:'center', marginLeft:5, marginRight:5, marginBottom:5,transform:[{translateY:0}] }}>
						<Text style={{color: Colors.darkYellow }}>{indicatorMessages[DATAUPDATED]}</Text>
					</View>
				</View>
			</View>
		)
	}

}

const SuccessAnimation = (props) => (
	<View style={styles.successAnimationContainer}>
		<View style={styles.successAnimationSubContainer}>
			<View style={styles.successAnimationPart1}>
				<Animated.View style={{backgroundColor: Colors.darkYellow, height:5, borderRadius:5, width: props.animationPart1Width}} />					
			</View>
			<View style={styles.successAnimationPart2}>
				<Animated.View style={{backgroundColor: Colors.darkYellow, height:5, borderRadius:5, width: props.animationPart2Width}} />
			</View>
		</View>
	</View>
)

const LoadingAnimation = (props) => (
	<View style={styles.loadingAnimationContainer}>
		<View style={styles.loadingAnimationSubContainer}>
				<View style={styles.loadingAnimationAnimatorContainer}>
					<Animated.View style={{zIndex:5, top:18, marginBottom:5, width:18, height:18, borderTopLeftRadius:20,  borderTopRightRadius:360,  transform:[{rotate: props.rotateValue},{translateX:10},{translateY:-10}], backgroundColor:'transparent', borderStyle: 'solid', borderWidth:5, borderLeftWidth:0,  borderColor: Colors.darkYellow}}></Animated.View>
					<View style={styles.loadingAnimationAnimatorHelper}></View>
				</View>
		</View>
	</View>
)

const ErrorAnimation = (props) => (
	<View style={styles.errorAnimationContainer}>
		<View style={styles.errorAnimationSubContainer}>
			<View style={styles.errorAnimationAnimatorContainerPart1}>
				<Animated.View style={{backgroundColor: '#bb0a0a', width: props.animationPart1Width, height:5, borderRadius:5}} />					
			</View>
			<View style={styles.errorAnimationAnimatorContainerPart2}>
				<Animated.View style={{backgroundColor: '#bb0a0a', width: props.animationPart2Width, height:5, borderRadius:5}} />
			</View>
			<View style={styles.errorAnimationAnimatorHelper}></View>
		</View>
	</View>
)

styles = StyleSheet.create({
	successAnimationContainer: {
		flexDirection:'row', 
		height:50,
		justifyContent:'center', 
		alignItems:'center', 
		transform:[{scale:(1,1)}]
	},
	successAnimationSubContainer: {
		marginTop:5, 
		marginRight:5
	},
	successAnimationPart1: {
		width:15, 
		height:5, 
		transform:[{rotate:'45deg'},{translateX:8},{translateY:3}], 
		zIndex:2, 
		borderRadius:5
	},
	successAnimationPart2: {
		width:35, 
		height:5, 
		transform:[{rotate:'315deg'},{translateX:9},{translateY:3}], 
		zIndex:1, 
		borderRadius:5
	},
	loadingAnimationContainer: {
		flexDirection:'row',
		height:50, 
		minWidth:100, 
		transform:[{scale:(1,1)},{translateY:3}], 
		justifyContent:'center', 
		alignItems:'center'
	},
	loadingAnimationSubContainer: {
		height:50, 
		width:80, 
		justifyContent:'center', 
		alignItems:'center', 
		transform:[{translateX:0},{translateY:0}]
	},
	loadingAnimationAnimatorContainer: {
		height:50,
		width:80,
		zIndex:5,
		transform:[{translateY:0}],
		justifyContent:'center',
		alignItems:'center'
	},
	loadingAnimationAnimatorHelper: {
		zIndex:10, 
		width:32, 
		height:34, 
		borderRadius:30, 
		backgroundColor:Colors.darkGreen, 
		transform:[{translateX:0},{translateY:-13}]
	},
	errorAnimationContainer: {
		flexDirection:'row',  
		height:50,
		justifyContent:'center', 
		alignItems:'center', 
		transform:[{scale:(1,1)}]
	},
	errorAnimationSubContainer: {
		marginTop:5, 
		marginBottom:5, 
		height:80, 
		width:80, 
		justifyContent:'center', 
		alignItems:'center', 
		marginRight:5, 
		zIndex:10, 
		transform:[{translateX:-10},{translateY:20}]
	},
	errorAnimationAnimatorContainerPart1: {
		zIndex:10,
		width:32, 
		height:5, 
		transform:[{rotate:'45deg'},{translateX:9},{translateY:-5}], 
		borderRadius:5
	},
	errorAnimationAnimatorContainerPart2: {
		zIndex:10, 
		width:32, 
		height:5, 
		transform:[{rotate:'315deg'},{translateX:9},{translateY:5}], 
		borderRadius:5
	},
	errorAnimationAnimatorHelper: {
		zIndex:1, 
		borderStyle:'solid', 
		borderWidth:2, 
		borderColor: '#bb0a0a',  
		width:40, 
		height:40, 
		borderRadius:30, 
		backgroundColor:Colors.darkYellow, 
		transform:[{translateX:10},{translateY:-25}]
	}

}) 