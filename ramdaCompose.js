var _xwrap = (function(){
	function XWrap(fn) {
		this.f = fn;
	}
	XWrap.prototype['@@transducer/init'] = function() {
		throw new Error('init not implemented on XWrap');
	};
	XWrap.prototype['@@transducer/result'] = function(acc) {
		return acc;
	};
	XWrap.prototype['@@transducer/step'] = function(acc, x) {
		return this.f(acc, x);
	};
	return function _xwrap(fn) { return new XWrap(fn); };
})()

var _arrayReduce = (xf, acc, list) => {
	var idx = 0
	var len = list.length
	while (idx < len) {
		acc = xf['@@transducer/step'](acc, list[idx]);
		idx += 1;
	}
	return xf['@@transducer/result'](acc);
}
var classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
var toUpper = str => str.toUpperCase()
var toLower = str => str.toLowerCase()
var tail = arr => arr.slice(1)
// console.log(tail(2,3,4))
// reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
// reduce 接受三个参数 (fn, acc, arr) fn接受两个参数
var reduce = (fn, acc, list) => (fn = _xwrap(fn), _arrayReduce(fn, acc, list))
var _pipe = (f, g) => (...args) => g.call(this, f.apply(this, args))
// (...args) => g.call(this, ((...args) => g.call(this, f.apply(this, args)).apply(this, args))
var reverse = arr => arr.reverse()
var _arity = (n, fn) => (...args) => fn.apply(this, args)
var remdaCompose = (...args) => pipe.apply(this, reverse(args))
var pipe = (...args) => _arity(args[0].length, reduce(_pipe, args[0], tail(args)))
console.log(remdaCompose(toLower, toUpper, classyGreeting)('dong', 'zhe'))
// classyGreeting toUpper toLower

// function (classyGreeting, toUpper) {
// 	return function f1() {
// 		toUpper.call(this, classyGreeting.apply(this, arguments))
// 	}
// }
// function (f1, toLower) {
// 	return function f2() {
// 		toLower.call(this, f1.apply(this, arguments))
// 	}
// }
// function (f2, hahah) {
// 	return function f3() {
// 		hahah.call(this, f2.apply(this, arguments))
// 	}
// }

