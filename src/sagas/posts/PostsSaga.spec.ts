import { getPosts as getPostsSaga } from './PostsSaga'

import { PostsResponseData, GeneralErrorResponse, PostData } from '../../api/ApiTypings'
import { externalApiMockFn, testSagaFlow } from '../Saga.spec.helper'
import PostsActions from '../../redux/posts'
import Post from '../../typings/Post'

describe('EventLocatorSaga', () => {
	const postDataMock: PostData = {
		author: 'author',
		created: 7200,
		created_utc: 0,
		id: '0123',
		is_video: false,
		likes: 0,
		selftext: 'text',
		subreddit: 'subreddit',
		title: 'title',
		thumbnail: 'thumb',
		url: 'asd',
		score: 0,
		num_comments: 0,
		preview: {
			enabled: false,
			images: [
				{
					id: '123123',
					source: {
						url: 'url',
						width: 0,
						height: 0
					}
				}
			]
		}
	}
	const rawPostsResponse: PostsResponseData = {
		after: '',
		before: '',
		children: [ { kind: 'kind', data: postDataMock } ],
		dist: 1,
		modhash: ''
	}
	const normalizedPost: Post = {
		author: 'author',
		created: 0,
		id: '0123',
		score: 0,
		content: 'text',
		title: 'title',
		thumbnail: 'thumb',
		comments: 0,
		image: 'url',
		width: 0,
		height: 0
	}
	test('Should fetch posts', async () => {
		const api = externalApiMockFn('getPosts', 200, { data: rawPostsResponse })
		const dispatch = await testSagaFlow(api, getPostsSaga, {})

		expect(dispatch).toHaveBeenCalledWith(
			PostsActions.getPostsSuccess({
				posts: [ normalizedPost ]
			})
		)
		expect(api.getPosts).toHaveBeenCalled()
	})

	test('Should return error when request fails', async () => {
		const error: GeneralErrorResponse = {
			status: 400,
			data: {}
		} as any
		const dispatch = await testSagaFlow(externalApiMockFn('getPosts', error.status, error.data), getPostsSaga, {})

		expect(dispatch).toHaveBeenCalledWith(PostsActions.getPostsFailure({ error }))
	})
})
