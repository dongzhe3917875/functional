var Container = function(x) {
    this.__value = x
}
Container.of = x => new Container(x);
var test = Container.of(1);
Container.prototype.map = function(f) {
    return Container.of(f(this.__value))
}
var test1 = Container.of(3)
    .map(x => x + 1)                 //=> Container(4)
    .map(x => 'Result is ' + x);

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
// 某种意义上讲，这是一种对参数的“缓存”
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
// flow 函数的实现 依次执行函数 有点像多面胶函数
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
var add = (x, y) => x + y
var square = n => n * n
var addSquare = flow([add, square])
addSquare(1, 2)
var prop = p => x => x[p]
var flowRight = funcs => flow(funcs.reverse())

var map = curry((f, functor) => functor.map(f))
var add = curry(add)
var doEverySomething = map(flowRight([add(10), prop("age")]));
var functor = Maybe.of({name: "Stark", age: 21});
doEverySomething(functor)