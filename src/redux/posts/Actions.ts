import { Action } from 'redux'

import { StateType } from './State'
import { createActions } from 'reduxsauce'
import Post from '../../typings/Post'
import { RequestFailureAction } from '../helpers/ReduxHelpers'

/* ------------- Types and Action Creators ------------- */

export const { Types, Creators } = createActions<CreatorsType>({
	getPostsRequest: [ '' ],
	getPostsSuccess: [ 'payload' ],
	getPostsFailure: [ 'payload' ]
})

/* --------------- Actions definitions ------------------- */

interface CreatorsType {
	getPostsRequest: () => GetPostsRequestAction
	getPostsSuccess: (
		payload: {
			posts: Post[]
		}
	) => GetPostsSuccessAction
	getPostsFailure: (
		payload: {
			error: StateType['getPosts']['__error']
		}
	) => RequestFailureAction
}

export interface GetPostsRequestAction extends Action {}

export interface GetPostsSuccessAction extends Action {
	payload: {
		posts: Post[]
	}
}
