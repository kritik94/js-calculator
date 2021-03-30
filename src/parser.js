const defaultPrioritizedTokens = ['^', '*', '/', '+', '-']

export function parse(tokens) {
  return parseParentheses(tokens)[0]
}

function parseParentheses(tokens) {
  const iterParentheses = (token, before, after) => {
    if (after.length === 0) {
      return [parseNext(defaultPrioritizedTokens, [...before, token])]
    }

    if (token == ')') {
      return [parseNext(defaultPrioritizedTokens, before), ...after]
    }

    if (token == '(') {
      const [nextTokenForParentheses, ...nextAfterForParentheses] = after

      const [parenthesesAst, ...afterParentheses] = iterParentheses(
        nextTokenForParentheses,
        [],
        nextAfterForParentheses
      )
      const nextBefore = [...before, parenthesesAst]
      const [nextToken, ...nextAfter] = afterParentheses

      return iterParentheses(nextToken, nextBefore, nextAfter)

    }

    const [nextToken, ...nextAfter] = after
    const nextBefore = [...before, token]

    return iterParentheses(nextToken, nextBefore, nextAfter)
  }

  const [token, ...after] = tokens
  return iterParentheses(token, [], after)
}

function parseNext([operatorToken, ...prioritizedTokens], tokens) {
  if (tokens.length == 1) {
    return tokens[0]
  }

  const iter = (operator, left, right, before, after) => {
    let nextLeft, nextBefore

    if (operator == operatorToken) {
      nextLeft = buildOperatorAst(operator, left, right)
      nextBefore = before
    } else {
      nextLeft = right
      nextBefore = [...before, left, operator]
    }

    if (after.length < 2) {
      return [...nextBefore, nextLeft]
    }

    const [nextOperator, nextRight, ...nextAfter] = after
    return iter(nextOperator, nextLeft, nextRight, nextBefore, nextAfter)
  }

  const [left, operator, right, ...tail] = tokens

  const astTokens = iter(operator, left, right, [], tail)

  if (prioritizedTokens.length == 0) {
    if (astTokens.length != 1) {
      throw new Error('parse is invalide')
    }
    
    return astTokens[0]
  }

  return parseNext(prioritizedTokens, astTokens)
}

function buildOperatorAst(operator, left, right) {
  return {
    type: 'operator',
    value: operator,
    left: buildOperandAst(left),
    right: buildOperandAst(right),
  }
}

function buildOperandAst(operand) {
  if (typeof operand === 'object') {
    return operand
  }

  return {
    type: 'number',
    value: parseInt(operand),
  }
}