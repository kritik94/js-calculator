import { calculate } from "../index";

test.each([
  ['1 + 2', 3],
  ['1 + 2 + 3 + 4', 10],
  ['2 + 3 * 2', 8],
  ['(2 + 3) * 2', 10],
  ['(2 * (2 + 3)) * 2', 20],
  ['((2 + 2) * 3) + (3 - 1) * 2', 16],
])('%s = %d', (expression, expectedResult) => {
  expect(calculate(expression)).toBe(expectedResult)
})