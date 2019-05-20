import * as React from 'react'
import { View, Text, Image, ImageStyle, TextStyle, ViewStyle, Dimensions } from 'react-native'
import { Card, CardItem, Body, Left, Icon, Right } from 'native-base'
import moment from 'moment'
import TouchableScale from 'react-native-touchable-scale'

export interface PostListItemProps {
	id: string
	author: string
	title: string
	image: string
	imageWidth: number
	imageHeight: number
	createdAt: number
	score: number
	commentsCount: number
	onPostPressed: () => void
}

const window = Dimensions.get('window')

class PostListItem extends React.PureComponent<PostListItemProps, {}> {
	getImageWidth = () => {
		return window.width * 0.99
	}

	getImageHeight = () => {
		if (this.props.imageHeight === 0) {
			return 0
		}
		const ratio = window.width * 0.99 / this.props.imageWidth
		return this.props.imageHeight * ratio
	}

	render() {
		const { image, title } = this.props
		moment.locale('pl')
		return (
			<TouchableScale onPress={this.props.onPostPressed} activeScale={0.9}>
				<Card>
					<CardItem>
						<Left>
							<Body>
								<Text testID="authorLabel">Author: {this.props.author}</Text>
							</Body>
						</Left>
					</CardItem>
					{image.length > 0 && (
						<CardItem cardBody>
							<Image
								source={{ uri: image }}
								style={[ IMAGE_STYLE, { width: this.getImageWidth(), height: this.getImageHeight() } ]}
							/>
						</CardItem>
					)}
					<CardItem>
						<Text numberOfLines={4} ellipsizeMode="tail">
							{this.props.title}
						</Text>
					</CardItem>
					<CardItem>
						<Left style={STAT_CONTAINER}>
							<Icon testID="scoreIcon" style={ICON_STYLE} active name="thumbs-up" />
							<Text testID="scoreLabel" style={STAT_LABEL}>
								{this.props.score} Likes
							</Text>
						</Left>
						<Body style={STAT_CONTAINER}>
							<Icon testID="commentsIcon" style={ICON_STYLE} active name="chatbubbles" />
							<Text testID="commentsLabel" style={STAT_LABEL}>
								{this.props.commentsCount} Comments
							</Text>
						</Body>
						<Right>
							<Text>{moment.utc(this.props.createdAt).fromNow()}</Text>
						</Right>
					</CardItem>
				</Card>
			</TouchableScale>
		)
	}
}

export { PostListItem }

export default PostListItem

const IMAGE_STYLE: ImageStyle = {
	resizeMode: 'cover'
}

const STAT_LABEL: TextStyle = {
	fontSize: 14
}

const ICON_STYLE: TextStyle = {
	fontSize: 18,
	margin: 4
}

const STAT_CONTAINER: ViewStyle = {
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'flex-start'
}
