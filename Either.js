// Either
Either = function() {};
Either.of = function(x) {
  return new Right(x);
}

Left = function(x) {
  this.__value = x;
}

// TODO: remove this nonsense
Left.of = function(x) {
  return new Left(x);
}

Left.prototype.map = function(f) { return this; }
Left.prototype.ap = function(other) { return this; }
Left.prototype.join = function() { return this; }
Left.prototype.chain = function() { return this; }
Left.prototype.inspect = function() {
  return 'Left('+inspect(this.__value)+')';
}


Right = function(x) {
  this.__value = x;
}

// TODO: remove in favor of Either.of
Right.of = function(x) {
  return new Right(x);
}

Right.prototype.map = function(f) {
  return Right.of(f(this.__value));
}

Right.prototype.join = function() {
  return this.__value;
}

Right.prototype.chain = function(f) {
  return f(this.__value);
}

Right.prototype.ap = function(other) {
  return this.chain(function(f) {
    return other.map(f);
  });
}

Right.prototype.join = function() {
  return this.__value;
}

Right.prototype.chain = function(f) {
  return f(this.__value);
}

Right.prototype.inspect = function() {
  return 'Right('+inspect(this.__value)+')';
}
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  exports.Left = Left;
  exports.Right = Right;
} else {
  window.Left = Left
  window.Right = Right
}