var flow = function(funcs) {
	var length = funcs.length
	var index = length
	while (index--) {
		if (typeof funcs[index] !== 'function') {
			throw new TypeError('Expected a function');
		}
	}
	return function(...args) {
		var index = 0
		var result = length ? funcs[index].apply(this, args) : args[0]
		while (++index < length) {
			result = funcs[index].call(this, result)
		}
		return result
	}
}
module.exports = flow