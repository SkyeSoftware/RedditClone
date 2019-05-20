import * as React from 'react'
import { shallow } from 'enzyme'

import { Text, FlatList } from 'react-native'
import { AsyncStatus } from '../../../redux/Async'
import { post } from '../../../fixtures/Post'
import { DetailsViewProps, DetailsView } from '../DetailsView'

describe('DeckListItem', () => {
	let props: DetailsViewProps
	beforeAll(() => {
		props = {
			post: post,
			onCommentPressed: jest.fn(),
			onDownvotePressed: jest.fn(),
			onSharePressed: jest.fn(),
			onUpvotePressed: jest.fn()
		}
	})

	test('Should render header', () => {
		const component = shallow(<DetailsView {...props} />)
		expect(component.find({ testID: 'header' })).toHaveLength(1)
  })
  
  test('Header should display correct text', () => {
		const component = shallow(<DetailsView {...props} />)
		expect(component.find({ testID: 'header' }).children().text()).toBe(props.post.title)
	})
})
