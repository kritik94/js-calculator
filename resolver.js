export function resolve(ast) {
  const simplify = (ast) => {
    if (ast.type === 'operator') {
      const func = operationFunc[ast.value]
      const {value: leftValue} = simplify(ast.left)
      const {value: rightValue} = simplify(ast.right)

      return {
        type: 'number',
        value: func(leftValue, rightValue)
      }
    }

    return ast
  }

  return simplify(ast).value
}

const operationFunc = {
  '+': (l, r) => l + r,
  '-': (l, r) => l - r,
  '*': (l, r) => l * r,
  '/': (l, r) => l / r,
}