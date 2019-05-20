import { InitialAsyncRequestState } from './../Async'
import Post from '../../typings/Post'

export const InitialState = {
	getPosts: {
		...InitialAsyncRequestState,
		list: [] as Post[],
		total: 0
	}
}

export type StateType = typeof InitialState
