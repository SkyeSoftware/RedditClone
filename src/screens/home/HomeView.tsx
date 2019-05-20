import * as React from 'react'
import Post from '../../typings/Post'
import { AsyncStatus } from '../../redux/Async'
import { View, FlatList } from 'react-native'
import PostListItem from '../../components/postListItem/PostListItem'

export interface HomeViewProps {
	onPostPressed: (post: Post) => void
	posts: Post[]
	status: AsyncStatus
}

class HomeView extends React.Component<HomeViewProps, {}> {
	render() {
		return (
			<View>
				<FlatList
					testID="postsList"
					keyExtractor={this.keyExtractor}
					data={this.props.posts}
					bounces={false}
					renderItem={this.renderItem}
				/>
			</View>
		)
	}

	keyExtractor = (item, index) => index.toString()

	renderItem = ({ item, index }) => (
		<PostListItem
      id={item.id}
			author={item.author}
			title={item.title}
			image={item.image}
			imageWidth={item.width}
			imageHeight={item.height}
			createdAt={item.created}
			score={item.score}
			commentsCount={item.comments}
			onPostPressed={() => this.props.onPostPressed(item)}
		/>
	)
}
export { HomeView }
export default HomeView
