import { Navigation } from 'react-native-navigation'

import Login from './components/login/Login'
import CreateAccount from './components/login/CreateAccount'
import Profile from './components/login/UserProfile'
import SelectDialog from './components/login/SelectDialog'
import LoginProgress from './components/login/LoginProgress'


export function registerScreens(store, Provider){
	Navigation.registerComponent('FBLogin.Login', () => Login, store, Provider);
	Navigation.registerComponent('FBLogin.CreateAccount', () => CreateAccount, store, Provider);
	Navigation.registerComponent('FBLogin.Profile', () => Profile, store, Provider);
	Navigation.registerComponent('FBLogin.SelectDialog', () => SelectDialog, store, Provider);
	Navigation.registerComponent('FBLogin.LoginProgress', () => LoginProgress, store, Provider);
}