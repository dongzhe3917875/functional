// 相当于flowRight 反过来就是 args.shift 就相当于flow
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
