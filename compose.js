// 相当于flowRight 反过来就是 args.shift 就相当于flow
var curry = require('./curry.js')
var compose = function(...args) {
	var len = args.length
	var count = 0
	return function f1(x) {
		var result, index = (len - count)
		--index >= 0 && (result = args[index](x))
		if (index <= 0) {
			count = 0
			return result
		} else {
			count++
			return f1.call(null, result)
		}
	}
}
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports = compose
} else {
	window.compose = compose
}

var get = curry((x, arr) => arr[x])
var map = curry((f, arr) => arr.map(f))
var getIndex = index => get(index)
var reverse = arr => arr.reverse()
var getValue = curry((a, b) => compose(...map(getIndex,reverse(a)))(b))
console.log(getValue([0,1,1,1], [[1,[1,[1, 2]]]]))

