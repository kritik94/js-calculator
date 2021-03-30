import { parse } from '../src/parser'

test.each([
  [
    ['1', '+', '2'],
    {
      type: 'operator',
      value: '+',
      left: {type: 'number', value: 1},
      right: {type: 'number', value: 2},
    }
  ],
  [
    ['1', '+', '2', '+', '3', '+', '4'],
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
    }
  ],
  [
    ['1', '+', '2', '*', '3'],
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
    }
  ],
])('%s should parsed to\n%o', (expression, expectedAst) => {
  expect(parse(expression)).toStrictEqual(expectedAst)
})

// parentheses
test.each([
  [
    ['(', '1', '+', '2', ')', '*', '3'],
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
    }
  ],
  [
    ['1', '+', '(', '2', '*', '3', ')'],
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
    }
  ],
  [
    ['(', '1', '*', '2', ')', '+', '3'],
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
    }
  ],
  [
    ['1', '*', '(',  '2', '+', '3', ')'],
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
    }
  ],
])('%s should parsed to\n%o', (expression, expectedAst) => {
  expect(parse(expression)).toStrictEqual(expectedAst)
})

// // errors
// test.each([
//   ['1 + 2 @ 3', 'parse is invalide'],
// ])('%s should throw error %s', (expression, expectedError) => {
//   expect(() => parse(expression)).toThrowError(expectedError)
// })