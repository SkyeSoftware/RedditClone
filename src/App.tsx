import * as React from 'react'
import AppNavigatorContainer from './navigators/AppNavigator'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import createStore from './redux'
import PersistorContext from './redux/PersistorContext'

const { store, persistor } = createStore()

export default class App extends React.Component<{}, {}> {
	render() {
		return (
			<PersistorContext.Provider value={persistor}>
				<Provider store={store}>
					<PersistGate persistor={persistor}>
						<AppNavigatorContainer />
					</PersistGate>
				</Provider>
			</PersistorContext.Provider>
		)
	}
}
