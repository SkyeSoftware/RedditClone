import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'
import HomeScreen from '../screens/home/HomeScreen'
import SplashScreen from '../screens/splash/SplashScreen'
import DetailsScreen from '../screens/details/DetailsScreen';

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

const RootNavigator = createSwitchNavigator({
	splash: SplashStack,
	app: AppStack
})

const AppNavigatorContainer = createAppContainer(RootNavigator)

export default AppNavigatorContainer
