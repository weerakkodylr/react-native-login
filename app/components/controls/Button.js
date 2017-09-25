import React from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import { FormElementProperties, ContainerProperties, ScaleProperties, CommonProperties } from '../../common/StyleConstants'


const inputButton = {
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: FormElementProperties.buttonBackgroundColor,
			borderRadius: 10,
			borderWidth: FormElementProperties.buttonBorderWidth,
			borderColor: CommonProperties.borderColor,
			borderStyle: 'solid',
			minHeight: CommonProperties.inputElementMinHeightX,
		} 

const loginButtonText = {	
			fontSize: ScaleProperties.fontSizeX,
			color: FormElementProperties.buttonTextColor,
		}

export default (props) =>  (
				<TouchableOpacity style={{...inputButton, ...props.buttonStyle}} onPress={props.eventHandler} disabled={props.isDisabled || false}>
					<Text style={{...loginButtonText,...props.buttonTextStyle}}>{props.buttonText}</Text>
				</TouchableOpacity>
)
