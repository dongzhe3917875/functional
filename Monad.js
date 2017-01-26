// process.argv 从第二个参数开始是输入的参数
var catFiles = process.argv.splice(2);
// flowRight 返回一个function
var flowRight = require('./flowRight.js')
var curry = require('./curry.js')
var IO = require('./IO.js')
var fs = require('fs')
var map = curry((f, x) => x.map(f))
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
var cat = flowRight([map(print), readFile]);
// f = flowRight(print, _ => fs.readFileSync(fileName, 'utf-8'))
// var catIO = cat('curry.js')
// 执行第一层IO print 执行后又返回一层IO
// var catreadFileSync = catIO.__value()
// 最后执行console.log 的IO
// catreadFileSync.__value()
catFiles.forEach(ele => cat(ele).__value().__value())