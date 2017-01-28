// https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/ch5.html#范畴学
// 示例数据
var CARS = [
	{
		name: "Ferrari FF",
		horsepower: 660,
		dollar_value: 700000,
		in_stock: true
	},
	{
		name: "Spyker C12 Zagato",
		horsepower: 650,
		dollar_value: 648000,
		in_stock: false
	},
	{
		name: "Jaguar XKR-S",
		horsepower: 550,
		dollar_value: 132000,
		in_stock: false
	},
	{
		name: "Audi R8",
		horsepower: 525,
		dollar_value: 114200,
		in_stock: false
	},
	{
		name: "Aston Martin One-77",
		horsepower: 750,
		dollar_value: 1850000,
		in_stock: true
	},
	{
		name: "Pagani Huayra",
		horsepower: 700,
		dollar_value: 1300000,
		in_stock: false
	}
]
var curry = require('./curry.js')
var compose = require('./compose.js')
var trace = require('./trace.js')
var accounting = require('./accounting.js')
var prop = curry((property, obj) => obj[property])
var last = arr => arr[arr.length -1]
var head = arr => arr[0]
// 找到最后一辆车的in_stock属性
var findLastInStock = compose(prop('in_stock'), last)
var findFirstName = compose(prop('name'), head)
console.log(findLastInStock(CARS))
console.log(findFirstName(CARS))
// reduce 累加
var add = (x, y) => x + y
var reduce = curry((f, init, xs) => xs.reduce(f, init, xs))
// 求平均值
var _average = xs => reduce(add, 0, xs) / xs.length
// var _average = function(xs) { return reduce(add, 0, xs) / xs.length }
console.log(_average([1,2,3,4,5]))
// 求所有车辆的平均值
var map = curry((f, arr) => arr.map(f))
var car_average = compose(_average, map(prop('dollar_value')))
console.log(car_average(CARS))
// 返回下划线连接的小写字符串
var toLowerCase = str => str.toLowerCase()
var replace = curry((reg, repl, str) => str.replace(reg, repl))
var _underscore = replace(/\W+/g, '_')
console.log(_underscore("Hello World"))
var sanitizeNames = map(compose(_underscore, toLowerCase))
console.log(sanitizeNames(["Hello World"]))
// availablePrices
var filter = curry((f, arr) => arr.filter(f))
var getPrice = compose(map(prop('dollar_value')), filter(prop('in_stock')))
var format = compose(map(accounting.formatMoney), getPrice)
console.log(format(CARS))
// var availablePrices = 
