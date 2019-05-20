import { path } from 'ramda'
import { PersistConfig, Transform } from 'redux-persist'
// localStorage if web, AsyncStorage if react-native
import storage from 'redux-persist/lib/storage'
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'

import immutablePersistenceTransform from './config/ImmutablePersistenceTransform'

// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const persistConfig: PersistConfig = {
	key: 'RedditClient',
	// bump version when state has significant change. it will be cleared and
	// filled by default values
	version: 1,
	storage,
	// Persist only those keys and skip other
	transforms: [ immutablePersistenceTransform ],
	stateReconciler: autoMergeLevel1,
	migrate: (state: {}, version: number) => {
		const oldVersion = path([ '_persist', 'version' ], state)
		if (oldVersion === version) {
			return Promise.resolve(state)
		}
		console.warn(`New version of state detected ("${oldVersion}" -> "${version}"). Deleting old state.`)
		return Promise.resolve({})
	}
}

export default persistConfig
