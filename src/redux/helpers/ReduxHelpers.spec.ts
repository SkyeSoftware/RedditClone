import { deepFreeze, createReducer } from './ReduxHelpers';

test('deepFreeze should freeze objects for any deep level', () => {
    const exampleData = {
        __status: 321,
        __error: 321,
        test: {
            __status: 321,
            __error: 321,
            arr: [
                {
                    __status: 321,
                    __error: 321,
                },
            ],
        },
    };
    const result = deepFreeze(exampleData);
    expect(Object.isFrozen(result)).toBe(true);
    expect(Object.isFrozen(result.test)).toBe(true);
    expect(Object.isFrozen(result.test.arr)).toBe(true);
    expect(Object.isFrozen(result.test.arr[0])).toBe(true);
});

test('createReducer should create reducer that auto-freeze state after all actions', () => {
    const initState = {
        start1: 123,
        b: {},
    };
    const testReducer = createReducer(initState, {
        TEST_ACTION: (state, action) => ({ ...state, start1: 999 }),
    });

    const newState = testReducer(initState, { type: 'TEST_ACTION' });
    expect(newState.start1).toBe(999);
    expect(Object.isFrozen(newState)).toBe(true);
});

test('createReducer should create non-freezing reducer when in production mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const initState = {
        start1: 123,
        b: {},
    };
    const testReducer = createReducer(initState, {
        TEST_ACTION: (state, action) => ({ ...state, start1: 999 }),
    });

    const newState = testReducer(initState, { type: 'TEST_ACTION' });
    expect(newState.start1).toBe(999);
    expect(Object.isFrozen(newState)).toBe(false);

    process.env.NODE_ENV = originalEnv;
});
