import { ApisauceConfig } from 'apisauce'
import Api from './Api'
import { sauceMock } from './ApiTestUtils'

describe('API service', () => {
	const apiSauceFactory = (config: ApisauceConfig) => sauceMock as any
	const api = new Api(apiSauceFactory)

	beforeEach(() => {
		for (const fnName in sauceMock) {
			if (sauceMock.hasOwnProperty(fnName)) {
				sauceMock[fnName].mockReset()
			}
		}
	})

	test('should fetch posts', () => {
		api.getPosts()
		expect(sauceMock.get).toHaveBeenCalled()
	})
})
