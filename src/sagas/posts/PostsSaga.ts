import { normalizePosts } from './../Normalizers'
import { GetPostsResponse } from './../../api/ApiTypings'
import { GetPostsRequestAction } from './../../redux/posts/Actions'
import { put, call, select } from 'redux-saga/effects'
import API from '../../api/Api'

import { GeneralErrorResponse } from '../../api/ApiTypings'

import PostsActions from '../../redux/posts'

export function* getPosts(api: API, action: GetPostsRequestAction) {
	const response: GetPostsResponse = yield call(api.getPosts)
	if (response.status === 200) {
		const posts = normalizePosts(response.data.data)
		yield put(PostsActions.getPostsSuccess({ posts }))
	} else {
		yield put(
			PostsActions.getPostsFailure({
				error: (response as unknown) as GeneralErrorResponse
			})
		)
	}
}
