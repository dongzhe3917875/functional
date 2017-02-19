var flow = require('./flow.js')
var flowRight = function(funcs) {
	return flow(funcs.reverse())
}
var fn = flowRight([])
console.log(fn('sss'))
module.exports = flowRight