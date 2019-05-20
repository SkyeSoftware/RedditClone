import Transform from './ImmutablePersistenceTransform'

test('Immutable transform should not transform data on write time', () => {
	const exampleData = { test: 5 }
	expect(Transform.in(exampleData)).toBe(exampleData)
})

test('Immutable transform should reset __status and __error on any deep level when reading', () => {
	const exampleData = {
		__status: 321,
		__error: 321,
		test: {
			__status: 321,
			__error: 321,
			arr: [
				{
					__status: 321,
					__error: 321
				}
			]
		}
	}
	const result = Transform.out(exampleData)
	expect(Object.isFrozen(result)).toBe(true)
	expect(Object.isFrozen(result.test)).toBe(true)
	expect(Object.isFrozen(result.test.arr)).toBe(true)
	expect(Object.isFrozen(result.test.arr[0])).toBe(true)
})
