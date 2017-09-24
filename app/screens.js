import { Navigation } from 'react-native-navigation'

import Login from './components/login/Login'
import Profile from './components/login/UserProfile'
import Welcome from './components/games/Welcome'
import SelectDialog from './components/login/SelectDialog'
import LoginProgress from './components/login/LoginProgress'
import ActivityIndicator from './components/common/ActivityIndicator' 
import Test from './components/common/controlls/OverlayMessages' 


export function registerScreens(store, Provider){
	Navigation.registerComponent('FBLogin.Login', () => Login, store, Provider);
	Navigation.registerComponent('FBLogin.Profile', () => Profile, store, Provider);
	Navigation.registerComponent('FBLogin.Game.Welcome', () => Welcome, store, Provider);
	Navigation.registerComponent('FBLogin.SelectDialog', () => SelectDialog, store, Provider);
	Navigation.registerComponent('FBLogin.LoginProgress', () => LoginProgress, store, Provider);
	Navigation.registerComponent('FBLogin.ActivityIndicator', () => ActivityIndicator, store, Provider);
	Navigation.registerComponent('FBLogin.Test', () => Test, store, Provider);
}