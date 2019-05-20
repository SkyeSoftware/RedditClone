import * as React from 'react'
import { View, Text, Image, ImageStyle, ViewStyle, ActivityIndicator } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { images } from '../../themes/images'

export interface SplashScreenProps extends NavigationScreenProps {}

class SplashScreen extends React.Component<SplashScreenProps, {}> {
	componentDidMount() {
		setTimeout(() => this.props.navigation.navigate('app'), 2000)
	}

	render() {
		return (
			<View style={CONTAINER}>
				<Image style={BACKGROUND} source={images.splash.background} />
				<View style={PROGRESS_CONTAINER}>
					<ActivityIndicator size="large" />
				</View>
			</View>
		)
	}
}

export default SplashScreen

const CONTAINER: ViewStyle = {
	flex: 1,
	alignItems: 'center',
	justifyContent: 'center'
}

const BACKGROUND: ImageStyle = {
	resizeMode: 'cover'
}

const PROGRESS_CONTAINER: ViewStyle = {
	position: 'absolute',
	bottom: 0,
	width: '100%',
	height: 160,
	alignItems: 'center',
	justifyContent: 'center'
}
