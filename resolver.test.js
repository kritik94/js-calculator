import { resolve } from './resolver.js'

test.each([
  [
    {
      type: 'number',
      value: 1,
    },
    1
  ],
  [
    {
      type: 'operator',
      value: '+',
      left: {type: 'number', value: 1},
      right: {type: 'number', value: 2},
    },
    3
  ],
  [
    {
      type: 'operator',
      value: '+',
      left: {
        type: 'operator',
        value: '+',
        left: {
          type: 'operator',
          value: '+',
          left: {type: 'number', value: 1},
          right: {type: 'number', value: 2},
        },
        right: {type: 'number', value: 3},
      },
      right: {type: 'number', value: 4},
    },
    10
  ],
  [
    {
      type: 'operator',
      value: '+',
      left: {type: 'number', value: 1},
      right: {
        type: 'operator',
        value: '*',
        left: {type: 'number', value: 2},
        right: {type: 'number', value: 3},
      },
    },
    7
  ],
])('resolve ast:\n%o', (ast, expectedResult) => {
  expect(resolve(ast)).toBe(expectedResult)
})

// parentheses
test.each([
  [
    {
      type: 'operator',
      value: '*',
      left: {
        type: 'operator',
        value: '+',
        left: {type: 'number', value: 1},
        right: {type: 'number', value: 2},
      },
      right: {type: 'number', value: 3},
    },
    9
  ],
  [
    {
      type: 'operator',
      value: '+',
      left: {type: 'number', value: 1},
      right: {
        type: 'operator',
        value: '*',
        left: {type: 'number', value: 2},
        right: {type: 'number', value: 3},
      },
    },
    7
  ],
  [
    {
      type: 'operator',
      value: '+',
      left: {
        type: 'operator',
        value: '*',
        left: {type: 'number', value: 1},
        right: {type: 'number', value: 2},
      },
      right: {type: 'number', value: 3},
    },
    5
  ],
  [
    {
      type: 'operator',
      value: '*',
      left: {type: 'number', value: 1},
      right: {
        type: 'operator',
        value: '+',
        left: {type: 'number', value: 2},
        right: {type: 'number', value: 3},
      },
    },
    5
  ],
])('resolve ast:\n%o', (ast, expectedResult) => {
  expect(resolve(ast)).toBe(expectedResult)
})
