var curry = function(fn) {
	// 取得函数参数的数量
	var limit = fn.length
		// 命名函数
	return function f1(...args) {
		// 按照 lodash, 当所有参数大于等于 fn 的长度，就返回结果 执行f1 根据参数判断是否缓存参数结束 结束执行 没有结束 返回一个记住参数的函数
		if (args.length >= limit) {
			return fn.apply(null, args)
		} else {
			return function f2(...args2) {
				// 的确是在不断的缓存参数 每次缓存参数都有可能返回一个函数
				return f1.apply(null, args.concat(args2))
			}
		}
	}
}
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = curry;
} else {
	window.curry = curry
}

// ES6 写法
var currySimple = fn => {
	var limit = fn.length
	var f1 = null
	return f1 = (...args) => args.length >= limit ? fn.apply(null, args) : (...args2) => f1.apply(null, args.concat(args2))
}

// 一行 但是有性能问题 每次都读取一遍fn.length 不能将参数缓存下来
var currySingle = fn => f1 = (...args) => args.length >= fn.length ? fn.apply(null, args) : (...args2) => f1.apply(null, args.concat(args2))
// 
var currySingle = fn => ((limit) => f1 = (...args) => args.length >= limit ? fn.apply(null, args) : (...args2) => f1.apply(null, args.concat(args2)))(fn.length)