// https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/ch4.html#总结
var curry = require('./curry.js')
var flowRight = require('./flowRight.js')
var split = curry((spliter, str) => str.split(spliter))
var map = curry((f, arr) => arr.map(f))
var match = curry((what, str) => str.match(what))
var filter = curry((f, arr) => arr.filter(f))
var splitSpace = split(' ')
var sentences = map(splitSpace)
var filterQs = filter(match(/q/i))
var _keepHighest = (x, y) => x >= y ? x : y
var _keepLowest = (x, y) => x <= y ? x : y
var reduce = curry((f, init, arr) => arr.reduce(f, init))
var max = reduce(_keepHighest, -Infinity)
var min = reduce(_keepLowest, +Infinity)
console.log(max([1, 4, 7, 9, 0, 2]))
console.log(min([1, 4, 7, 9, 0, 2]))
var slice = curry((start, end, arr) => arr.slice(start, end))
// 取出每一项的前n个字符
var strtaken = curry((n, str) => str.slice(0, n))
// 取出前n项的前n个字符
var taken = (n, m) => flowRight([map(strtaken(n)), slice(0, m)])
console.log(taken(2, 3)(['dong', 'zhe', 'bondage', 'haha']))