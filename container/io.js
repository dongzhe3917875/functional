var curry = require('../curry.js')
var compose = require('../compose.js')
var trace = require('../trace.js')
var fs = require('fs')
var prop = curry((item, obj) => obj[item])
var map = curry((f, functor) => functor.map(f))
var add = curry((x, y) => x + y)
var concat = curry((oristr, str) => oristr.concat(str))
var split = curry((spliter, str) => str.split(spliter))
var head = x => x[0]
//  getFromStorage :: String -> (_ -> String)
var getFromStorage = function(key) {
  return function() {
    return localStorage[key];
  }
}
// 在这里我们返回的是一个函数
// 同一个输入就总能返回同一个输出：一个从 localStorage 里取出某个特定的元素的函数。
// 这个函数总是不会变的

var IO = function(f) {
	this.__value = f
}
IO.of = x => new IO(_ => x)
IO.prototype.map = function(f) {
	return new IO(compose(f, this.__value))
}
// console.log(module)
// io_module:: IO module
var io_module = IO.of(module)
// IO({__value : _ => module})

// console.log(io_module.map(module => module.exports))
console.log(io_module.map(prop('paths')).map(head).map(split('/')).__value())
// $:: String -> IO [file]
var $ = fileName => new IO(_ => fs.readFileSync(fileName, 'utf-8'))
var print = x => new IO(_ => {
	console.log(x)
	return x
})
var cat = compose(map(print), $)
console.log(cat('either.js'))
// new IO(compose(print, _ => fs.readFileSync(fileName, 'utf-8'))) => func
// func.__value() => new IO(_ => {console.log(fs.readFileSync(fileName, 'utf-8'))}) => func2
// func2.__value(). ok
