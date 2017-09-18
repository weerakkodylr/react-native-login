import React from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import { FormElementProperties, ContainerProperties, ScaleProperties, CommonProperties } from '../../../common/StyleConstants'

const inputContainer= {
		marginLeft:0, 
		marginRight:0, 
		minHeight: CommonProperties.inputElementMinHeightX,
		marginBottom:0,
	}

const inputButton = {
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

export default (props) =>  (
			<View style={{...inputContainer, ...props.buttonContainerStyle}}>
				<TouchableOpacity style={{...inputButton, ...props.buttonStyle}} onPress={props.eventHandler} disabled={props.isDisabled || false}>
					<Text style={{...loginButtonText,...props.buttonTextStyle}}>{props.buttonText}</Text>
				</TouchableOpacity>
			</View>
)
