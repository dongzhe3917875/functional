// Maybe
inspect = function(x) {
  return (x && x.inspect) ? x.inspect() : x;
}
Maybe = function(x) {
  this.__value = x;
};

Maybe.of = function(x) {
  return new Maybe(x);
};

Maybe.prototype.isNothing = function(f) {
  return (this.__value === null || this.__value === undefined);
};

Maybe.prototype.map = function(f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
};

Maybe.prototype.chain = function(f) {
  return this.map(f).join();
};

Maybe.prototype.ap = function(other) {
  return this.isNothing() ? Maybe.of(null) : other.map(this.__value);
};

Maybe.prototype.join = function() {
  return this.isNothing() ? Maybe.of(null) : this.__value;
}

Maybe.prototype.inspect = function() {
  return 'Maybe('+inspect(this.__value)+')';
}
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Maybe;
} else {
	window.Maybe = Maybe
}