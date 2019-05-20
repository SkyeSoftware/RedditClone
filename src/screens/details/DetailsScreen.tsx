import * as React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { View, Image, ViewStyle } from 'react-native'
import Post from '../../typings/Post'
import DetailsView from './DetailsView'
import { Toast } from 'native-base'

export interface DetailsScreenProps extends NavigationScreenProps<{ post: Post }> {}

class DetailsScreen extends React.Component<DetailsScreenProps, {}> {
	getPost = () => this.props.navigation.getParam('post')
	render() {
		return (
			<View style={CONTAINER}>
				<DetailsView
					post={this.getPost()}
					onCommentPressed={this.onActionButtonPressed}
					onDownvotePressed={this.onActionButtonPressed}
					onUpvotePressed={this.onActionButtonPressed}
					onSharePressed={this.onActionButtonPressed}
				/>
			</View>
		)
	}

	onActionButtonPressed = () => Toast.show({ text: 'Not implemented yet', duration: 2000 })
}

export default DetailsScreen

const CONTAINER: ViewStyle = {
	width: '100%',
	height: '100%'
}
