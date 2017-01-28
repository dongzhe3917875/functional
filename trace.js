var curry = require('./curry.js')
var trace = curry((tag, x) => {
	console.log(tag, x)
	return x
})
module.exports = trace