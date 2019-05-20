import * as React from 'react'
import { View, ViewStyle, TextStyle } from 'react-native'
import { Icon } from 'native-base'
import TouchableScale from 'react-native-touchable-scale'

export interface PostActionsProps {
	onUpvotePressed: () => void
	onDownvotePressed: () => void
	onCommentPressed: () => void
	onSharePressed: () => void
}

const renderButton = (testID: string, icon: string, onPressed: () => void) => (
	<TouchableScale testID={testID} activeScale={0.9} onPress={onPressed} style={BUTTON_CONTAINER}>
		<Icon style={ICON} name={icon} />
	</TouchableScale>
)

const PostActions: React.FunctionComponent<PostActionsProps> = ({
	onUpvotePressed,
	onDownvotePressed,
	onCommentPressed,
	onSharePressed
}: PostActionsProps) => {
	return (
		<View style={CONTAINER}>
			{renderButton('thumbsUp', 'thumbs-up', onUpvotePressed)}
			{renderButton('thumbsDown', 'thumbs-down', onDownvotePressed)}
			{renderButton('comment', 'chatbubbles', onCommentPressed)}
			{renderButton('share', 'share', onSharePressed)}
		</View>
	)
}

export { PostActions }
export default PostActions

const CONTAINER: ViewStyle = {
	flexDirection: 'row',
	borderBottomWidth: 1,
	borderBottomColor: 'grey'
}

const ICON: TextStyle = {
	fontSize: 24
}

const BUTTON_CONTAINER: ViewStyle = {
	flex: 1,
	height: 50,
	alignItems: 'center',
	justifyContent: 'center'
}
