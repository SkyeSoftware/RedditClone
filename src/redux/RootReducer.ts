import { combineReducers, AnyAction, ReducersMapObject } from 'redux'
import { persistReducer, PersistConfig } from 'redux-persist'
import { pick, mergeDeepLeft } from 'ramda'

import { RootState } from './RootState'
import { reducer as PostsReducer } from './posts'

const CommonReducers = {
	posts: PostsReducer
}

function baseReducer(state: RootState, action: AnyAction) {
	switch (action.type) {
		default:
			return state
	}
}

export default (persistConfig: PersistConfig, additionalReducers: ReducersMapObject = {}) => {
	const reducers = mergeDeepLeft(CommonReducers, additionalReducers)
	const appReducer = combineReducers(reducers)
	const rootReducer = (state: RootState, action: AnyAction) => appReducer(baseReducer(state, action), action)
	return persistReducer(persistConfig, rootReducer)
}
