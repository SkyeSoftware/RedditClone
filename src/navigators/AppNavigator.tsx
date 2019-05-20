import * as React from 'react'
import {
	createStackNavigator,
	createAppContainer,
	createSwitchNavigator,
	createDrawerNavigator
} from 'react-navigation'
import HomeScreen from '../screens/home/HomeScreen'
import SplashScreen from '../screens/splash/SplashScreen'
import DetailsScreen from '../screens/details/DetailsScreen'
import { Dimensions, Image } from 'react-native'
import { Icon } from 'native-base'
import DrawerContent from './DrawerContent';

const SplashStack = createStackNavigator(
	{
		splash: { screen: SplashScreen }
	},
	{
		initialRouteName: 'splash',
		headerMode: 'none'
	}
)

const AppStack = createStackNavigator({
	home: { screen: HomeScreen },
	details: { screen: DetailsScreen }
})

const DrawerStack = createDrawerNavigator(
	{
		home: AppStack
	},
	{
		drawerWidth: Dimensions.get('screen').width,
		drawerPosition: 'left',
		contentComponent: DrawerContent
	}
)

const RootNavigator = createSwitchNavigator({
	splash: SplashStack,
	app: DrawerStack
})

const AppNavigatorContainer = createAppContainer(RootNavigator)

export default AppNavigatorContainer
