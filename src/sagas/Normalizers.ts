import { GetPostsResponse, PostData, PreviewData, PostsResponseData } from '../api/ApiTypings'
import Post from '../typings/Post'

export const normalizePosts = (postsResponse: PostsResponseData) =>
	postsResponse.children.map((postListData) => normalizePost(postListData.data))

export const normalizePost = (postData: PostData): Post => {
	return {
		id: postData.id,
		author: postData.author,
		title: postData.title,
		created: (postData.created - 7200) * 1000,
		thumbnail: postData.thumbnail,
		...getImagePreview(postData.preview),
		content: postData.selftext,
		comments: postData.num_comments,
		score: postData.score
	}
}

export const getImagePreview = (preview: PreviewData) => {
	if (preview && preview.images && preview.images.length > 0) {
		const source = preview.images[0].source
		return { image: source.url.replace('amp;', ''), width: source.width, height: source.height }
	} else {
		return { image: '', width: 0, height: 0 }
	}
}
