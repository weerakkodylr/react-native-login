import React from 'react'
import { Provider } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import firebase from 'firebase'
import { registerScreens } from './screens'

import store from './store'



firebase.initializeApp({
   	apiKey: "AIzaSyBZhrP3QUG7Oa6X4wx4xfqSABE3lva_LZ0",
   	authDomain: "testlogin-6d25f.firebaseapp.com",
   	databaseURL: "https://testlogin-6d25f.firebaseio.com",
   	projectId: "testlogin-6d25f",
   	storageBucket: "testlogin-6d25f.appspot.com",
   	messagingSenderId: "983689687585"
})

registerScreens(store, Provider)

const navigatorStyle = ({
	statusBarColor: 'black',
	statusBarTextColorScheme: 'light',
	navBarHidden : true,
	tabBarButtonColor: 'red',
	tabBarSelectedButtonColor: 'red',
	tabBarBackgroundColor: 'white',
	topBarElevationShadowEnabled: false,
	navBarTextFontSize: 30,
	navBarBackgroundColor: '#2e8ea9',
	tabBarHidden: true,
	drawUnderTabBar: true
});

Navigation.startSingleScreenApp({
	screen: {
		screen: 'FBLogin.Login',
		title: 'User Login',
		navigatorStyle,
	}
})

