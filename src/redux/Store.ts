import {
	createStore,
	compose,
	applyMiddleware,
	Reducer,
	Middleware,
	ReducersMapObject,
	StoreCreator,
	Store
} from 'redux'
import createSagaMiddleware, { END, SagaMiddleware } from 'redux-saga'
import { persistStore, BoostrappedCallback, PersistConfig } from 'redux-persist'

import rootSaga from '../sagas/index'
import RootReducer from './RootReducer'

declare global {
	interface Console {
		tron: any
	}
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose
	}
}

interface StoreWithSagas extends Store {
	runSaga: SagaMiddleware<{}>['run']
	closeAllSagaChannels: () => void
}

interface StoreFactoryParams {
	persistConfig: PersistConfig
	platformReducersMap?: ReducersMapObject
	initialState?: object
	middlewares?: Middleware[]
	useReactotron?: boolean
	onStoreReady?: BoostrappedCallback
}

export default function storeFactory({
	persistConfig,
	platformReducersMap = {},
	initialState,
	middlewares = [],
	useReactotron = false,
	onStoreReady = null
}: StoreFactoryParams) {
	const rootReducer = RootReducer(persistConfig, platformReducersMap)
	const store = setupStore(rootReducer, initialState, middlewares, useReactotron)
	return {
		store,
		persistor: persistStore(store, {}, onStoreReady)
	}
}

function setupStore(rootReducer: Reducer, initialState: object, middlewares: Middleware[], useReactotron: boolean) {
	const sagaMiddleware = createSagaMiddleware({
		sagaMonitor: useReactotron ? console.tron.createSagaMonitor() : null
	})
	middlewares.push(sagaMiddleware)

	const createAppropriateStore: StoreCreator = useReactotron ? console.tron.createStore : createStore
	const store = createAppropriateStore(rootReducer, initialState, applyMiddleware(...middlewares)) as StoreWithSagas

	store.runSaga = sagaMiddleware.run
	store.closeAllSagaChannels = () => store.dispatch(END)

	store.runSaga(rootSaga)

	return store
}
