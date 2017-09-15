import React from 'react'
import {View, TouchableOpacity, Text} from 'react-native'

export default (props) => (
			<TouchableOpacity style={props.buttonStyle} onPress={props.eventHandler} disabled={props.isDisabled || false}>
				<Text style={props.buttonTextStyle}>{props.buttonText}</Text>
			</TouchableOpacity>
)
