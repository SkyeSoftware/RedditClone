import * as React from 'react'
import { View, Text } from 'react-native'
import { RootState } from '../../redux/RootState'
import PostsActions from '../../redux/posts'
import { connect } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'
import { AsyncStatus } from '../../redux/Async'
import Post from '../../typings/Post'
import HomeView from './HomeView'

export interface HomeScreenProps extends NavigationScreenProps {
	posts: {
		__status: AsyncStatus
		__error: {}
		list: Post[]
		total: number
	}
	fetchPosts: () => void
}

class HomeScreen extends React.Component<HomeScreenProps, {}> {
	componentDidMount() {
		this.props.fetchPosts()
	}

	render() {
		return (
			<View>
				<HomeView posts={this.props.posts.list} status={this.props.posts.__status} />
			</View>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	posts: state.posts.getPosts
})

const mapDispatchToProps = {
	fetchPosts: PostsActions.getPostsRequest
}

export { HomeScreen }
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
