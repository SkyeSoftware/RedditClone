import { createReducer as sauceCreateReducer } from 'reduxsauce'
import { Action, AnyAction, Reducer } from 'redux'
import { mapObjIndexed } from 'ramda'
import { ApiErrorResponse } from 'apisauce'

export type RequestFailureAction<TData = {}> = Action & {
	payload: {
		error: ApiErrorResponse<TData>
	}
}

export function deepFreeze<T extends Record<string, any>>(object: T): T {
	if (Object.isFrozen(object)) {
		return object
	}

	// Retrieve the property names defined on object
	const propNames = Object.getOwnPropertyNames(object)

	// Freeze properties before freezing self
	for (const name of propNames) {
		const value = object[name]

		object[name] = value && typeof value === 'object' ? deepFreeze(value) : value
	}

	return Object.freeze(object)
}

interface ActionTypesHandlers<TState> {
	[key: string]: Reducer
}

const freezedReducer = (reducer: Reducer) => <TState>(state: TState, action: AnyAction) =>
	deepFreeze(reducer(state, action))

// create reducers like reduxsauce, but freeze the state if it is not
// the production
export function createReducer<TState>(initialState: TState, actionTypesHandlers: ActionTypesHandlers<TState>): Reducer {
	const freezedActionTypesHandlers =
		process.env.NODE_ENV === 'production' ? actionTypesHandlers : mapObjIndexed(freezedReducer, actionTypesHandlers)
	return sauceCreateReducer(initialState, freezedActionTypesHandlers)
}
