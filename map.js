var curry = require('./curry.js')
var map = curry((f, functor) => functor.map(f))
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = map;
} else {
	window.map = map
}