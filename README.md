# js-calculator

Just calculate expression from string.
Just for learning.
Just for fun.

## Supported features
* Integer numbers
* Parentheses
* Operators:
  * `+`
  * `-`
  * `*`
  * `*`

## Examples

```
import { calculate } from './index.js'

calculate('2 + 2 * 3') // => 8
calculate('(2 + 2) * 3') // => 12
calculate('((2 + 2) * 3) + (3 - 1) * 2') // => 16
```

See more in [index.test.js](index.test.js)
