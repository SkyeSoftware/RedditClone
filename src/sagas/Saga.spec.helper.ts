import { runSaga } from 'redux-saga'
import { Saga } from '../typings'

// simple helpers to make saga tests shorter

export async function testSagaFlow<TParams>(apiMock: {}, saga: Saga, sagaParams?: TParams, mockState?: {}) {
	const dispatch = jest.fn()
	const getState = jest.fn().mockReturnValue(mockState)
	const paramsArray = Array.isArray(sagaParams) ? sagaParams : [ sagaParams ]
	await runSaga({ dispatch, getState }, saga, apiMock, ...paramsArray).done
	return dispatch
}

export function apiMockFn(fnName: string, status?: number, data?: {}) {
	return {
		[fnName]: jest.fn().mockReturnValue({ status, data })
	}
}

export function externalApiMockFn(fnName: string, status?: number, data?: {}) {
	return {
		[fnName]: jest.fn().mockReturnValue({ status, data })
	}
}
