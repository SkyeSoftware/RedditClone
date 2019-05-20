import * as React from 'react'
import { shallow } from 'enzyme'

import { HomeView, HomeViewProps } from '../HomeView'
import { Text, FlatList } from 'react-native'
import { AsyncStatus } from '../../../redux/Async'
import { post } from '../../../fixtures/Post'

describe('DeckListItem', () => {
	let props: HomeViewProps
	beforeAll(() => {
		props = {
			posts: [ post, post ],
			status: AsyncStatus.Init,
			onPostPressed: jest.fn()
		}
	})

	test('Should render FlatList', () => {
		const component = shallow(<HomeView {...props} />)
		expect(component.find(FlatList)).toHaveLength(1)
	})

	test('FlatList should contain two items', () => {
		const component = shallow(<HomeView {...props} />)
		const flatList = component.find({ testID: 'postsList' })
		expect(flatList.props().data.length).toBe(2)
	})
})
