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