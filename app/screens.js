import { Navigation } from 'react-native-navigation'

import Login from './containers/login/Login'
import Profile from './containers/login/UserProfile'
import Welcome from './containers/games/Welcome'
import SelectDialog from './components/controls/SelectDialog'
import LoginProgress from './containers/login/LoginProgress'
//import ActivityIndicator from './containers/common/ActivityIndicator' 
//import Test from './containers/common/controlls/OverlayMessages' 


export function registerScreens(store, Provider){
	Navigation.registerComponent('FBLogin.Login', () => Login, store, Provider);
	Navigation.registerComponent('FBLogin.Profile', () => Profile, store, Provider);
	Navigation.registerComponent('FBLogin.Game.Welcome', () => Welcome, store, Provider);
	Navigation.registerComponent('FBLogin.SelectDialog', () => SelectDialog, store, Provider)
	Navigation.registerComponent('FBLogin.LoginProgress', () => LoginProgress, store, Provider);
	//Navigation.registerComponent('FBLogin.ActivityIndicator', () => ActivityIndicator, store, Provider);
	//Navigation.registerComponent('FBLogin.Test', () => Test, store, Provider);
}