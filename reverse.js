var curry = require('./curry.js')
var compose = require('./compose.js')
var flowRight = require('./flowRight')
var trace = require('./trace.js')
var reduce = curry((f, init, arr) => arr.reduce(f, init))
var map = curry((f, x) => x.map(f))
var join = curry((em, arr) => arr.join(em))
var split = curry((em, str) => str.split(em))
var reverseconcat = (x, y) => [y].concat(x)
var toUpperCase = x => x.toUpperCase()
var head = x => x[0]
var reverse = reduce(reverseconcat, [])
// console.log(reverse([1, 2, 3, 4, 5]))
// 结合律（associativity）
// var associative = compose(f, compose(g, h)) == compose(compose(f, g), h);
// true
// var last = compose(toUpperCase, head, reduce(reverseconcat, []))
// console.log(last(['dong', 'zhe', 'bd', 'ok']))

// pointfree 不会明确地指出要操作的数据是什么
// var initials = flowRight([join('. '), map(flowRight([toUpperCase, head])), split(' ')])
var initials = compose(join('. '), map(compose(toUpperCase, head)), split(' '))

console.log(initials('aaaa bbbb ccccc'))
// console.log('aaaa bbbb ccccc'.split(' ').map(compose(toUpperCase, head)))