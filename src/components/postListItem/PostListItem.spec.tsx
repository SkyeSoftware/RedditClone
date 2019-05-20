import * as React from 'react'
import { shallow } from 'enzyme'

import { PostListItem, PostListItemProps } from './PostListItem'
import { Text } from 'react-native'

describe('PostListItem', () => {
	let props: PostListItemProps
	beforeAll(() => {
		props = {
			id: '01',
			commentsCount: 5,
			score: 10,
			author: 'CoolBoy',
			createdAt: 7200,
			title: 'Nice pic',
			image: 'image',
			imageWidth: 10,
			imageHeight: 10
		}
	})

	test('Should render score icon', () => {
		const component = shallow(<PostListItem {...props} />)
		const scoreIcon = component.find({ testID: 'scoreIcon' })
		expect(scoreIcon).toHaveLength(1)
	})

	test('Should render comments icon', () => {
		const component = shallow(<PostListItem {...props} />)
		const commentsIcon = component.find({ testID: 'commentsIcon' })
		expect(commentsIcon).toHaveLength(1)
	})

	test('Comments count label contains correct value', () => {
		const component = shallow(<PostListItem {...props} />)
		const commentsLabel = component.find({ testID: 'commentsLabel' })
		expect(commentsLabel.childAt(0).text()).toContain(props.commentsCount)
	})

	test('Score count label contains correct value', () => {
		const component = shallow(<PostListItem {...props} />)
		const scoreLabel = component.find({ testID: 'scoreLabel' })
		expect(scoreLabel.childAt(0).text()).toContain(props.score)
	})

	test('Score count label contains correct value', () => {
		const component = shallow(<PostListItem {...props} />)
		const scoreLabel = component.find({ testID: 'scoreLabel' })
		expect(scoreLabel.childAt(0).text()).toContain(props.score)
	})

	test('Author label contains correct author name', () => {
		const component = shallow(<PostListItem {...props} />)
		const scoreLabel = component.find({ testID: 'authorLabel' })
		expect(scoreLabel.childAt(1).text()).toContain(props.author)
	})
})
