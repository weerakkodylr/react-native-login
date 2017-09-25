import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { FormElementProperties, ContainerProperties, ScaleProperties, CommonProperties } from '../common/StyleConstants'
import { connect } from 'react-redux'
import { UserDataActionTypes } from '../common/Enums'

const { 
		UPDATING_USER_PROFILE_DATA,
		USER_PROFILE_DATA_UPDATED,
		USER_PROFILE_DATA_UPDATING_ERROR
	  } = UserDataActionTypes

class AcitivityIndicator extends React.Component{ 

	render(){
		let animatingStatus = true
		let statusMessage = this.props.statusMessage || "Loading..."


		if (this.props.stateDescription === USER_PROFILE_DATA_UPDATED) {
			this.props.navigator.dismissModal({
			  animationType: 'none' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
			});
		} else if (this.props.stateDescription === USER_PROFILE_DATA_UPDATING_ERROR) {
			statusMessage = error.message
			animatingStatus = false
		}

		return (
		<View style={styles.indicatorContainer}>
			<ActivityIndicator size={"large"} animating={animatingStatus} color={CommonProperties.textColor} />
			<Text style={styles.statusMessage}>{statusMessage}</Text>
		</View>
		)
	}
	

}

const styles = {
	indicatorContainer: {
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: CommonProperties.backgroundColor
	},
	statusMessage: {
		color: CommonProperties.textColor,
		fontSize: ScaleProperties.fontSizeX
	}
}

const storeProps = (store) => ({
	stateDescription: store.user.stateDescription
})

export default connect(storeProps)(AcitivityIndicator)