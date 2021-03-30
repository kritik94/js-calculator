import { tokenize } from "./lexer";
import { parse } from "./parser";
import { resolve } from "./resolver";

export function calculate(expression) {
  const tokens = tokenize(expression)
  const ast = parse(tokens)
  const result = resolve(ast)

  return result
}