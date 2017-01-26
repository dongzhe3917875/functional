// 相当于flowRight 反过来就是 args.shift 就相当于flow
var compose = function(...args) {
	return function f1(x) {
		var result = args.pop()(x)
		if (args.length === 0) {
			return result
		} else {
			return f1.call(null, result)
		}
	}
}
module.exports = compose