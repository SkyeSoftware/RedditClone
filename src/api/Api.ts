import { default as apisauce, ApisauceInstance } from 'apisauce'

export default class Api {
	private api: ApisauceInstance

	constructor(apisauceRef = apisauce.create) {
		this.api = apisauceRef({
			baseURL: 'https://www.reddit.com/r',
			timeout: 10 * 1500
		})
	}

	getPosts = () => this.api.get(`/pics/hot.json?limit=25`)
}
