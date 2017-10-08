import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet, ScrollView, Dimensions} from 'react-native'
import {connect} from 'react-redux'
import Button from '../../components/controls/Button'
import * as layoutActions from '../../actions/layoutActions'
import * as LoginActions from '../../actions/loginActions'
import firebase from 'firebase'

import { FormElementProperties, ContainerProperties, ScaleProperties, CommonProperties } from '../../common/StyleConstants'

class Welcome extends React.Component{
	constructor(){
		super()
	}

	handleLaunchGame(){

	}

	componentWillMount(){
		this.onLayoutChnage()
	}

	handleProfile(){
		this.props.navigator.push({
			screen: 'FBLogin.Profile',
			title: 'Profile',
			animated: 'false',
	  		animationType: 'slide-horizontal',
	  		passProps: {},
	  		navigatorStyle: {navBarHidden:false}
		})
	}

	handleLogout(){
		this.props.dispatch(LoginActions.logOut(firebase));
		// this.props.navigator.popToRoot({
		//   animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
		//   animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
		// });
	}

	onLayoutChnage(){
		const {height, width} = Dimensions.get('window');
		this.props.dispatch(layoutActions.setLayoutDimentions(width, height))
	}

	render(){
		
		const conditionalBorderColorLogin = CommonProperties.borderColor
		const conditionalTextColorLogin = CommonProperties.textColor

		const launchButton = {
			height: ScaleProperties.gameLaunchBoxSizeX,
			width: (this.props.layoutWidth - 20),
			marginBottom:10,
			borderRadius: FormElementProperties.borderRadius			
		}

		const controllButton = {
			height: CommonProperties.inputElementMinHeightX,
			width: (this.props.layoutWidth/2 - 10),
			marginLeft: 5,
			marginRight: 5,
		}

		return(
			<View style={styles.viewContainer}>
				<View style={styles.welcomeMessageContainer}>
					<Text style={styles.welcomeMessageText}>Games</Text>
				</View>
				<ScrollView onLayout={this.onLayoutChnage.bind(this)}>
					<View style={styles.gamesContainer}>
						<Button 
							buttonStyle={launchButton}
							buttonTextStyle={{}}
							isDisabled={false}
							buttonText={"Sweeper"} 
							eventHandler={this.handleLaunchGame.bind(this)}>
						</Button>
						<Button 
							buttonStyle={launchButton}
							isDisabled={false}
							buttonText={"Tic Tac"} 
							eventHandler={this.handleLaunchGame.bind(this)}>
						</Button>

					</View>
				</ScrollView>
				<View style={styles.controlBox}>
					<Button 
						buttonStyle={controllButton}
						isDisabled={false}
						buttonText={"Logout"} 
						eventHandler={this.handleLogout.bind(this)}>
					</Button>
					<Button 
						buttonStyle={controllButton}
						isDisabled={false}
						buttonText={"Profile"} 
						eventHandler={this.handleProfile.bind(this)}>
					</Button>	
				</View>
			</View>
		)
	}
}

const storeProps = (store) => ({
	name : store.user.displayName,
	layoutWidth: store.layout.layoutWidth,
    layoutHeight: store.layout.layoutHeight,
})

export default connect(storeProps)(Welcome)

const styles = StyleSheet.create({
	viewContainer: {
		backgroundColor: ContainerProperties.backgroundColor,
		flex: 1,
		//justifyContent: 'center',
	},
	welcomeMessageContainer: {
		//display: 'none'
		marginTop: 10
	},
	welcomeMessageText: {
		fontSize: ScaleProperties.fontSizeXXX,
		alignSelf: 'center',
		color: CommonProperties.textColor
	},
	gamesContainer: {
		//borderWidth: CommonProperties.borderWidth,
		//borderColor: CommonProperties.borderColor,
		//flexGrow:1,
		flexDirection: 'row',
		margin: 10,
		marginTop:20,
		//alignSelf:'center',
		justifyContent: 'space-around',
		//alignItems:'flex-start',
		//width: 400,
		//height:800,
		//backgroundColor: 'pink',
		flexWrap: 'wrap'
	},
	controlBox: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		minHeight: CommonProperties.inputElementMinHeightX,
		marginBottom:5
	},
	launchButtonText: {

	}
})

