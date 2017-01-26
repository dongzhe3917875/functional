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
var Maybe = function(x) {
  this.__value = x;
}

Maybe.of = function(x) {
  return new Maybe(x);
}

Maybe.prototype.map = function(f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
}

Maybe.prototype.isNothing = function() {
  return (this.__value === null || this.__value === undefined);
}

var IO = function(f) {
    this.__value = f
}
// IO包含的是包含返回值的函数
IO.of = x => new IO(_ => x)
IO.prototype.map = function(f) {
    return new IO(flowRight([f, this.__value]))
}
var flowRight = funcs => flow(funcs.reverse())
var split = curry((char, str) => str.split(char))
var filter = curry((f, arr) => arr.filter(f))
var last = arr => arr[arr.length - 1]
var first = arr => arr[0]
var map = curry((f, x) => x.map(f))
var eq = curry((x, y) => x === y)

// a=1&b=2 ['a=1', 'b=2'] => [[a, 1], [b, 2]]
var toPairs = flowRight([map(split('=')), split('&')])
// toPairs('a=1&b=2')
var params = flowRight([toPairs, last, split('?')])
params('http://xxx.com?a=1&b=2')
// var url = new IO(_ => window.location.href);
var url = new IO(_ => 'http://xxx.com?a=1&b=2');
var getParam = url => key => map(flowRight([Maybe.of, filter(flowRight([eq(key), first])), params]))(url);
// var choosekey = key => map(flowRight([Maybe.of, filter(flowRight([eq(key), first])), params]))
getParam(url)("a")