import * as React from 'react'
import { View, Text, ViewStyle } from 'react-native'
import { RootState } from '../../redux/RootState'
import PostsActions from '../../redux/posts'
import { connect } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'
import { AsyncStatus } from '../../redux/Async'
import Post from '../../typings/Post'
import HomeView from './HomeView'
import { Icon } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'

export interface HomeScreenProps extends NavigationScreenProps {
	posts: {
		__status: AsyncStatus
		__error: null
		list: Post[]
		total: number
	}
	fetchPosts: () => void
}

class HomeScreen extends React.Component<HomeScreenProps, {}> {
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'ReddicClone',
			headerLeft: () => (
				<TouchableOpacity style={HAMBURGER_ICON_CONTAINER} activeOpacity={0.99} onPress={navigation.openDrawer}>
					<Icon name="menu" />
				</TouchableOpacity>
			)
		}
	}
	componentDidMount() {
		this.props.fetchPosts()
	}

	render() {
		return (
			<View>
				<HomeView
					posts={this.props.posts.list}
					status={this.props.posts.__status}
					onPostPressed={this.onPostPressed}
				/>
			</View>
		)
	}

	onPostPressed = (post: Post) =>
		this.props.navigation.navigate({ routeName: 'details', key: 'details', params: { post } })
}

const mapStateToProps = (state: RootState) => ({
	posts: state.posts.getPosts
})

const mapDispatchToProps = {
	fetchPosts: PostsActions.getPostsRequest
}

export { HomeScreen }
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const HAMBURGER_ICON_CONTAINER: ViewStyle = {
	width: 50,
	height: '100%',
	alignItems: 'center',
	justifyContent: 'center'
}
