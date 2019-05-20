import Post from '../typings/Post'
import { deepFreeze } from '../redux/helpers/ReduxHelpers'

export const post = deepFreeze<Post>({
	id: 'id',
	author: 'author',
	title: 'title',
	image: 'image',
	width: 1,
	height: 1,
	created: 0,
	comments: 0,
	score: 0,
	thumbnail: 'thumbnail',
	content: 'content'
})
