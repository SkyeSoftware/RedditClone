import { CLIENT_ERROR } from 'apisauce'
import { AsyncStatus, pendingReducerIn, successReducerIn, errorReducerIn } from './Async'

describe('pendingReducerIn', () => {
	test('should fill request __status for given state subkey, reset __error ', () => {
		const state = {
			test: {
				__status: AsyncStatus.Success,
				__error: {},
				users: [ {} ]
			}
		}
		const action = { type: '' }
		const pendingReducerInTest = pendingReducerIn('test')
		expect(pendingReducerInTest(state, action)).toEqual({
			test: {
				__status: AsyncStatus.Pending,
				__error: null as {},
				users: [ {} ]
			}
		})
		expect(pendingReducerInTest({}, action)).toEqual({
			test: {
				__status: AsyncStatus.Pending,
				__error: null as {}
			}
		})
	})

	test('should fill handle mapper in given subkey ', () => {
		const state = {
			test: {
				__status: AsyncStatus.Success,
				__error: {},
				users: [ {} ]
			}
		}
		const testData = [ { name: '1' }, { name: '2' } ]
		const testAction = { type: '', data: testData }

		const mapper = (testState: typeof state.test, action: typeof testAction) => ({
			...testState,
			users: action.data
		})
		const pendingReducerInTest = pendingReducerIn('test', mapper)
		expect(pendingReducerInTest(state, testAction)).toEqual({
			test: {
				__status: AsyncStatus.Pending,
				__error: null as {},
				users: testData
			}
		})
		expect(pendingReducerInTest({}, testAction)).toEqual({
			test: {
				__status: AsyncStatus.Pending,
				__error: null as {},
				users: testData
			}
		})
	})
})

describe('successReducerIn', () => {
	test('should fill request __status for given state subkey, reset __error ', () => {
		const state = {
			test: {
				__status: AsyncStatus.Error,
				__error: {},
				users: [ {} ]
			}
		}
		const action = { type: '' }
		const successReducerInTest = successReducerIn('test')
		expect(successReducerInTest(state, action)).toEqual({
			test: {
				__status: AsyncStatus.Success,
				__error: null as {},
				users: [ {} ]
			}
		})
		expect(successReducerInTest({}, action)).toEqual({
			test: {
				__status: AsyncStatus.Success,
				__error: null as {}
			}
		})
	})

	test('should fill handle mapper in given subkey ', () => {
		const state = {
			test: {
				__status: AsyncStatus.Init,
				__error: {},
				users: [ {} ]
			}
		}
		const testData = [ { name: '1' }, { name: '2' } ]
		const testAction = { type: '', data: testData }

		const mapper = (testState: typeof state.test, action: typeof testAction) => ({
			...testState,
			users: action.data
		})
		const successReducerInTest = successReducerIn('test', mapper)
		expect(successReducerInTest(state, testAction)).toEqual({
			test: {
				__status: AsyncStatus.Success,
				__error: null as {},
				users: testData
			}
		})
		expect(successReducerInTest({}, testAction)).toEqual({
			test: {
				__status: AsyncStatus.Success,
				__error: null as {},
				users: testData
			}
		})
	})
})

describe('errorReducerIn', () => {
	test('should fill request __status for given state subkey, set __error ', () => {
		const state = {
			test: {
				__status: AsyncStatus.Pending,
				__error: null as {}
			}
		}
		const action = {
			type: '',
			payload: {
				error: {
					status: 500,
					data: {},
					ok: false as false,
					problem: CLIENT_ERROR,
					originalError: {} as any
				}
			}
		}
		const errorReducerInTest = errorReducerIn('test')
		expect(errorReducerInTest(state, action)).toEqual({
			test: {
				__status: AsyncStatus.Error,
				__error: action.payload.error
			}
		})
		expect(errorReducerInTest({}, action)).toEqual({
			test: {
				__status: AsyncStatus.Error,
				__error: action.payload.error
			}
		})
	})

	test('should fill handle mapper in given subkey ', () => {
		const state = {
			test: {
				__status: AsyncStatus.Init,
				__error: {}
			}
		}
		const testAction = {
			type: '',
			payload: {
				error: {
					status: 500,
					data: {},
					ok: false as false,
					problem: CLIENT_ERROR,
					originalError: {} as any
				}
			}
		}

		const mapper = (testState: typeof state.test, action: typeof testAction) => ({
			...testState,
			errorStatus: action.payload.error.status
		})
		const errorReducerInTest = errorReducerIn('test', mapper)
		expect(errorReducerInTest(state, testAction)).toEqual({
			test: {
				__status: AsyncStatus.Error,
				__error: testAction.payload.error,
				errorStatus: testAction.payload.error.status
			}
		})
		expect(errorReducerInTest({}, testAction)).toEqual({
			test: {
				__status: AsyncStatus.Error,
				__error: testAction.payload.error,
				errorStatus: testAction.payload.error.status
			}
		})
	})
})
