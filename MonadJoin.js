// flowRight 返回一个function
var flowRight = require('./flowRight.js')
var curry = require('./curry.js')
var IO = require('./IO.js')
var fs = require('fs')
var map = curry((f, x) => x.map(f))
var join = x => x.join()
// IO.prototype.join = function() {
// 	return this.__value ? this.__value() : IO.of(null)
// }
// fs.readFileSync 属于不纯的 依赖于外部环境的状态
var readFile = function(fileName) {
	return new IO(_ => fs.readFileSync(fileName, 'utf-8'))
}
// console.log属于不纯的 依赖于外部环境的状态
var print = x => new IO(_ => {
	console.log(x)
	return x
})
// IO.prototype.map = function(f) {
// 	return new IO(flowRight([f, this.__value]))
// }
var cat = flowRight([join, map(print), readFile]);
cat('curry.js').__value()
// f = flowRight(print, _ => fs.readFileSync(fileName, 'utf-8'))