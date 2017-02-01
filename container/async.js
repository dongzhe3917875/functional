var Task = require('data.task')
var curry = require('../curry.js')
var fs = require('fs')
var split = curry((spliter, str) => str.split(spliter))
var readFile = fileName => new Task((reject, result) => {
	fs.readFile(fileName, ((err, data) => err ? reject(err) : result(data)))
})
// 例子中的 reject 和 result 函数分别是失败和成功的回调
// 都是把对未来的操作的指示放在一个时间胶囊里
console.log(readFile('io.js').fork(err => console.log(err), data => console.log(data)))