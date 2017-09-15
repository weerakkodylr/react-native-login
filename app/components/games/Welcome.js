import React from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import {connect} from 'react-redux'

class Welcome extends React.Component{
	constructor(){
		super()
	}

	render(){
		
		return(
			<View>
				<Text>Welcome {this.props.name}</Text>
			</View>
		)
	}
}

const storeProps = (store) => ({
	
})

export default connect(storeProps)(Welcome)

