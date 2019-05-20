import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'

import { HomeScreen, HomeScreenProps } from '../HomeScreen'
import HomeView from '../HomeView'
import { createTestPropsWithNavigation } from '../../../utils/tests'
import { AsyncStatus } from '../../../redux/Async'

describe('EventLocatorContainer', () => {
	let props: HomeScreenProps
	let component: ShallowWrapper

	beforeAll(() => {
		props = createTestPropsWithNavigation({
			fetchPosts: jest.fn(),
			posts: {
				list: [],
				total: 0,
				__status: AsyncStatus.Init,
				__error: null
			}
		})
	})

	test('should render only EventLocatorView', () => {
		component = shallow(<HomeScreen {...props} />)
		expect(component.find(HomeView)).toHaveLength(1)
	})
})
