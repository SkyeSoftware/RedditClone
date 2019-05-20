import React from 'react'
import { View, Text } from 'react-native'
import { shallow, ShallowWrapper } from 'enzyme'
import { findByTestID, extractValueFromText } from './tests'

const CustomComponent = () => (
	<View key="parent">
		<Text key="title_key" testID={'title'}>
			MyCustomComponentTitle
		</Text>
	</View>
)

const EmptyTextComponent = () => (
	<View key="parent">
		<Text key="title_key" testID={'title'} />
	</View>
)

describe('Testing test utils', () => {
	let component: ShallowWrapper
	beforeAll(() => {
		component = shallow(<CustomComponent />)
	})

	test('Check if findByTestID will return proper child', () => {
		const title = findByTestID(component, 'title')
		expect(title).toHaveLength(1)
	})

	test('Check if component returned by findByTestID functions has correct type', () => {
		const title = findByTestID(component, 'title')
		expect(title.type()).toBe(Text)
	})

	test('CHeck if component has rendered proper text.', () => {
		const title = findByTestID(component, 'title')
		expect(title.contains('MyCustomComponentTitle')).toBe(true)
	})

	test('Should return empty object if view with provided testID does not exists', () => {
		const title = findByTestID(component, 'title_fake_id')
		expect(title).toEqual({})
	})

	// test('extractValueFromText should return proper value from <Text> component', () => {
	//     const title = findByTestID(component, 'title');
	//     expect(extractValueFromText(title)).toBe('MyCustomComponentTitle');
	// });

	// test('extractValueFromText should return proper value from <Text> component', () => {
	//     const emptyTextComponent = shallow(<EmptyTextComponent />);
	//     const title = findByTestID(emptyTextComponent, 'title');
	//     expect(extractValueFromText(title)).toBe('');
	// });
})
