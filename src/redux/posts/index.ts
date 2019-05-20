import { mergeDeepRight } from 'ramda'
import { InitialState, StateType } from './State'
import { pendingReducerIn, successReducerIn, errorReducerIn } from '../Async'
import { Types, Creators, GetPostsSuccessAction } from './Actions'
import { createReducer } from '../helpers/ReduxHelpers'

export const PostsTypes = Types
export default Creators

export const reducer = createReducer(InitialState, {
	[Types.GET_POSTS_REQUEST]: pendingReducerIn('getPosts'),
	[Types.GET_POSTS_SUCCESS]: successReducerIn('getPosts', getPostsSuccess),
	[Types.GET_POSTS_FAILURE]: errorReducerIn('getPosts')
})

/* ----------------- reducers --------------------- */

function getPostsSuccess(
	state: StateType['getPosts'],
	action: GetPostsSuccessAction
): Partial<StateType['getPosts']> {
	return {
		list: action.payload.posts,
		total: action.payload.posts.length
	}
}
