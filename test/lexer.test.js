import { tokenize } from '../src/lexer'

test.each([
  ['1 + 2', ['1', '+', '2']],
  ['123 + 25', ['123', '+', '25']],
  ['1    +   2', ['1', '+', '2']],
  ['1+ 2', ['1', '+', '2']],
  ['1 +2', ['1', '+', '2']],
  ['1+2', ['1', '+', '2']],
])("%s parsed to:\n    %j", (expression, expectedTokens) => {
  expect(tokenize(expression)).toStrictEqual(expectedTokens)
})

// parentheses
test.each([
  ['(1 + 2)', ['(', '1', '+', '2', ')']],
  ['(1 + ( 2 / 3))', ['(', '1', '+', '(', '2', '/', '3', ')', ')']],
  ['((1 * 2) - 3)', ['(', '(', '1', '*', '2', ')', '-', '3', ')']],
])("%s parsed to:\n    %j", (expression, expectedTokens) => {
  expect(tokenize(expression)).toStrictEqual(expectedTokens)
})