import { tokenize } from "./src/lexer";
import { parse } from "./src/parser";
import { resolve } from "./src/resolver";

export function calculate(expression) {
  const tokens = tokenize(expression)
  const ast = parse(tokens)
  const result = resolve(ast)

  return result
}