var flowRight = require('./flowRight.js')
var curry = require('./curry.js')
var IO = function(f) {
	this.__value = f;
}
IO.of = x => new IO(_ => x)
IO.prototype.map = function(f) {
	return new IO(flowRight([f, this.__value]))
}
IO.prototype.join = function() {
	return this.__value ? this.__value() : IO.of(null)
}
IO.prototype.chain = function(f) {
  return this.map(f).join();
}
module.exports = IO