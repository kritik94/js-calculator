import { calculate } from ".";

test.each([
  ['1 + 2', 3],
  ['1 + 2 + 3 + 4', 10],
  ['2 + 3 * 2', 8],
  ['(2 + 3) * 2', 10],
  ['(2 * (2 + 3)) * 2', 20],
])('%s = %d', (expression, expectedResult) => {
  expect(calculate(expression)).toBe(expectedResult)
})