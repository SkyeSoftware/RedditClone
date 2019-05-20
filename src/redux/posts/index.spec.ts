import { mergeDeepRight } from 'ramda'

import { reducer, default as Creators } from './index'
import { InitialState, StateType } from './State'
import { AsyncStatus } from '../Async'
import { post as PostMock } from '../../fixtures/Post'
import { GeneralErrorResponse } from '../../api/ApiTypings'

describe('"Posts" reducer', () => {
	test('"GET_POSTS_REQUEST" action should set pending status', () => {
		const state = InitialState
		const action = Creators.getPostsRequest()
		const newState: StateType['getPosts'] = reducer(state, action).getPosts
		expect(newState.__status).toBe(AsyncStatus.Pending)
	})
	test('"GET_POSTS_SUCCESS" action should put posts data and update status in the state', () => {
		const state = InitialState
		const action = Creators.getPostsSuccess({
			posts: [ PostMock ],
			total: 1
		})
		const newState: StateType['getPosts'] = reducer(state, action).getPosts
		expect(newState).toMatchObject({
			__status: AsyncStatus.Success,
			__error: null,
			list: [ PostMock ],
			total: 1
		})
	})
	test('"GET_POSTS_FAILURE" action should put error and update status in the state', () => {
		const state = InitialState
		const error: GeneralErrorResponse = {
			status: 400,
			data: {}
		} as any
		const action = Creators.getPostsFailure({
			error
		})
		const newState: StateType['getPosts'] = reducer(state, action).getPosts
		expect(newState.__status).toBe(AsyncStatus.Error)
		expect(newState.__error).toEqual(error)
	})
})
