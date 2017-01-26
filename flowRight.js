var flow = require('./flow.js')
var flowRight = function(funcs) {
	return flow(funcs.reverse())
}
module.exports = flowRight