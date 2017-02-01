var Task = require('data.task')
var curry = require('../curry.js')
var fs = require('fs')
var split = curry((spliter, str) => str.split(spliter))
var readFile = fileName => new Task((reject, result) => {
	fs.readFile(fileName, ((err, data) => err ? reject(err) : result(data)))
})
console.log(readFile('io.js').fork(err => console.log(err), data => console.log(data)))