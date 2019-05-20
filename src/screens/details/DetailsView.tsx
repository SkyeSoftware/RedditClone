import * as React from 'react'
import { View, ScrollView, Image, Dimensions, ViewStyle, Text, TextStyle } from 'react-native'
import Post from '../../typings/Post'
import moment from 'moment'
import PostActions from '../../components/postActions/PostActions'

const window = Dimensions.get('window')

export interface DetailsViewProps {
	post: Post
	onUpvotePressed: () => void
	onDownvotePressed: () => void
	onCommentPressed: () => void
	onSharePressed: () => void
}

class DetailsView extends React.Component<DetailsViewProps, {}> {
	getImageWidth = () => {
		return window.width
	}

	getImageHeight = () => {
		const post = this.props.post
		if (post.height === 0) {
			return 0
		}
		const ratio = window.width / post.width
		return post.height * ratio
	}

	render() {
		const post = this.props.post
		return (
			<ScrollView style={CONTAINER}>
				<Text testID="header" numberOfLines={1} style={HEADER}>
					{post.title}
				</Text>
				<View style={SUBHEADER_CONTAINER} testID="subheader">
					<Text style={SUBHEADER_LABEL}>{moment.utc(this.props.post.created).fromNow()}</Text>
					<Text style={SUBHEADER_LABEL}>·</Text>
					<Text style={SUBHEADER_LABEL}>{post.author}</Text>
					<Text style={SUBHEADER_LABEL}>·</Text>
					<Text style={SUBHEADER_LABEL}>{post.score} points</Text>
					<Text style={SUBHEADER_LABEL}>·</Text>
					<Text style={SUBHEADER_LABEL}>{post.comments} comments</Text>
				</View>
				<Image
					testID="image"
					source={{ uri: this.props.post.image }}
					style={{ width: this.getImageWidth(), height: this.getImageHeight(), resizeMode: 'cover' }}
				/>
				<PostActions
					onUpvotePressed={this.props.onUpvotePressed}
					onDownvotePressed={this.props.onDownvotePressed}
					onSharePressed={this.props.onSharePressed}
					onCommentPressed={this.props.onCommentPressed}
				/>
				<Text style={CONTENT}>{post.content}</Text>
			</ScrollView>
		)
	}
}

export { DetailsView }
export default DetailsView

const CONTAINER: ViewStyle = {
	width: '100%',
	flex: 1
}

const HEADER: TextStyle = {
	marginTop: 8,
	fontSize: 14,
	paddingHorizontal: 16
}

const SUBHEADER_CONTAINER: ViewStyle = {
	paddingHorizontal: 16,
	marginVertical: 4,
	width: '100%',
	flexDirection: 'row'
}

const SUBHEADER_LABEL: TextStyle = {
	fontSize: 10,
	marginHorizontal: 2
}

const CONTENT: TextStyle = {
	padding: 16,
	fontSize: 14
}
