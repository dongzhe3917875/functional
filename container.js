var Container = function(x) {
	this.__value = x
}
inspect = function(x) {
  return (x && x.inspect) ? x.inspect() : x;
}
Container.of = x => new Container(x)
Container.prototype.map = function(f){
  return Container.of(f(this.__value))
}
Container.prototype.inspect = function() {
	return `Container true value is ${inspect(`${this.__value}`)}`
}
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Container;
} else {
	window.Container = Container
}