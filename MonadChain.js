// flowRight 返回一个function
var flowRight = require('./flowRight.js')
var curry = require('./curry.js')
var IO = require('./IO.js')
var fs = require('fs')
var map = curry((f, x) => x.map(f))
var match = curry((re, context) => context.match(re))
var join = x => x.join()
var chain = curry((f, functor) => functor.chain(f));
// IO.prototype.join = function() {
// 	return this.__value ? this.__value() : IO.of(null)
// }
// fs.readFileSync 属于不纯的 依赖于外部环境的状态
var readFile = function(fileName) {
	return new IO(_ => fs.readFileSync(fileName, 'utf-8'))
}
// console.log属于不纯的 依赖于外部环境的状态
var print = x => new IO(_ => {
	// console.log(x)
	return x
})
var getModule = match(/module\.exports\s=\s(.+)/)
// var getModule = match(/\s=\s(.+)$/)
var getModuleName = context => new IO(_ => {
	console.log(getModule(context)[1])
	return getModule(context)[1]
})
// IO.prototype.map = function(f) {
// 	return new IO(flowRight([f, this.__value]))
// }
// 每次使用map后都相当于嵌套了一层IO 所以都需要使用join来剥离多余的包装
// var doSomething = compose(join, map(f), join, map(g), join, map(h));
// 我们希望的是每次使用map之后自动使用join来剥离多余的包装
// 使用chain之前
// var cat = flowRight([join, map(print), readFile]);
// 使用chain之后
var cat = flowRight([chain(print), readFile])
// 也可以写成
readFile('curry.js').chain(print).chain(getModuleName).__value()
// 以上真是太厉害了 可以实现链式调用了
// 上面就是一个IO=>(对IO进行操作(map)=>剥离一层包装(join)(执行一层IO还是返回IO))(chain)=>chain....=>this.__value()得到最后的结果
// cat('curry.js').__value()
// f = flowRight(print, _ => fs.readFileSync(fileName, 'utf-8'))