var curry = require('./curry.js')
var trace = curry((tag, x) => {
	console.log(tag, x)
	return x
})
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = trace
} else {
	window.trace = trace
}
