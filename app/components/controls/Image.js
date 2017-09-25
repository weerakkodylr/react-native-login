import React from 'react'
import { Image } from 'react-native'

const ImageComponent = (props) => {
	return <Image source={props.source} resizeMode={"contain"}/>
}

export default ImageComponent;