import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight,ListView, } from 'react-native'

export default class SelectDialog extends React.Component{
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.listDataSource = { 
			dataSource: ds.cloneWithRows(this.props.listViewData),
		 }
	}

	closeDialog(){
		//this.props.navigator.dismissLightBox();
		this.props.navigator.dismissModal({
		  animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
		});
	}

	handleSelectedItemPress(key){
		this.props.dispatch(this.props.action(key));
		this.closeDialog();
	}

	rowRender(item, sectionID, rowID, highlightRow){
		let selectedItem = {}
		if(item.optionKey === this.props.currentSelection)
			selectedItem = {backgroundColor: '#798fc3', color:'#ffffff'}

		const defaultStyles = {fontSize:25,paddingLeft:50,paddingRight:50,paddingTop:5, paddingBottom:5, backgroundColor:'#ffffff'}


		return (<View style={{borderBottomWidth:0}}>
			<Text style={{...defaultStyles,...selectedItem}} onPress={this.handleSelectedItemPress.bind(this,item.optionKey)}>{item.optionValue}</Text>
		</View>
		)
	}

	renderSeparator(){
		return (<View style={{flex:1, height: StyleSheet.hairlineWidth, backgroundColor:'#000000'}}></View>)
	}

	scrollToSelectedItem(){
        //this.listView.scrollTo({ y: Math.floor((30 * 3)), animated: true });
	}

	render(){
		return(
			<View style={styles.listViewContainer}>
				
					<ListView contentContainerStyle={styles.listItems} scrollRenderAheadDistance={100}
						dataSource={this.listDataSource.dataSource}
						renderRow={this.rowRender.bind(this)}
						onLayout={this.scrollToSelectedItem.bind(this)}
      					renderSeparator = {this.renderSeparator.bind(this)}
						>
					</ListView>
				
			</View>
		)
	}
}

const styles = StyleSheet.create({
	listViewContainer: {
		flex:1, 
		justifyContent: 'center', 
		alignItems:'stretch',
		backgroundColor:'#ffffff',

	},
	listItems: {
		//flex:1,
		paddingTop: 2,
		paddingBottom: 2,
		alignItems: 'stretch',
		//justifyContent: 'center',
		flexDirection: 'column',
		borderRadius: 5,
		backgroundColor:'#ffffff',
		//marginLeft:10,
		//marginRight:10,
		//borderColor: '#c6c6c6',
		//borderWidth: 1
	}
})