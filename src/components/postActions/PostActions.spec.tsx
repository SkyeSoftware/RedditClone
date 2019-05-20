import * as React from 'react'
import { shallow } from 'enzyme'

import { PostActions, PostActionsProps } from './PostActions'
import TouchableScale from 'react-native-touchable-scale'

describe('DeckListItem', () => {
	let props: PostActionsProps
	beforeAll(() => {
		props = {
			onCommentPressed: jest.fn(),
			onDownvotePressed: jest.fn(),
			onSharePressed: jest.fn(),
			onUpvotePressed: jest.fn()
		}
	})

	test('Should render four items', () => {
		const component = shallow(<PostActions {...props} />)
		const buttons = component.find(TouchableScale)
		expect(buttons).toHaveLength(4)
  })
  
  test('onCommentPressed should be called after tap', () => {
    const component = shallow(<PostActions {...props} />)
    const button = component.find({ testID: 'comment'})
    button.simulate('press')
    expect(props.onCommentPressed).toHaveBeenCalled()
  })

  test('onSharePressed should be called after tap', () => {
    const component = shallow(<PostActions {...props} />)
    const button = component.find({ testID: 'share'})
    button.simulate('press')
    expect(props.onSharePressed).toHaveBeenCalled()
  })

  test('onUpvotePressed should be called after tap', () => {
    const component = shallow(<PostActions {...props} />)
    const button = component.find({ testID: 'thumbsUp'})
    button.simulate('press')
    expect(props.onUpvotePressed).toHaveBeenCalled()
  })

  test('onDownvotePressed should be called after tap', () => {
    const component = shallow(<PostActions {...props} />)
    const button = component.find({ testID: 'thumbsDown'})
    button.simulate('press')
    expect(props.onDownvotePressed).toHaveBeenCalled()
  })
})
