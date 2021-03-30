export function tokenize(expression) {
  const iter = (state, chars, tokens) => {
    if (chars.length === 0) {
      if (state.type !== 'empty') {
        return [...tokens, state.seq.join('')]
      }
      return tokens
    }

    const [char, ...tail] = chars
    const newState = nextState(char, state)

    if (state.type !== 'empty'
      && state.type !== newState.type
      || state.type === 'parenthesis'
    ) {
      return iter(newState, tail, [...tokens, state.seq.join('')])
    }

    return iter(newState, tail, tokens)
  }

  return iter({type: 'empty'}, expression, [])
}

function nextState(char, state) {
  const type = resolveType(char)
  const func = charToCharMap[state.type][type]
  const newState = func(char, state)

  return newState
}

function resolveType(char) {
  switch (true) {
    case /\d/.test(char):
      return 'digit'
    case /[+\-*//^]/.test(char):
      return 'operator'
    case /\s/.test(char):
      return 'empty'
    case /[()]/.test(char):
      return 'parenthesis'
  }
}

const toEmpty = (char, state) => ({type: 'empty'})
const toOperator = (char, state) => ({type: 'operator', seq: [char]})
const toDigit = (char, state) => ({type: 'digit', seq: [char]})
const addDigit = (char, {seq}) => ({type: 'digit', seq: [...seq, char]})
const toParenthesis = (char, state) => ({type: 'parenthesis', seq: [char]})

const charToCharMap = {
  empty: {
    empty: toEmpty,
    digit: toDigit,
    operator: toOperator,
    parenthesis: toParenthesis,
  },
  digit: {
    empty: toEmpty,
    digit: addDigit,
    operator: toOperator,
    parenthesis: toParenthesis,
  },
  operator: {
    empty: toEmpty,
    digit: toDigit,
    parenthesis: toParenthesis,
  },
  parenthesis: {
    empty: toEmpty,
    digit: toDigit,
    operator: toOperator,
    parenthesis: toParenthesis,
  },
}