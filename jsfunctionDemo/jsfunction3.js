// 这里是一样的=。=
var Left = function(x) {
  this.__value = x;
}
var Right = function(x) {
  this.__value = x;
}

// 这里也是一样的=。=
Left.of = function(x) {
  return new Left(x);
}
Right.of = function(x) {
  return new Right(x);
}

// 这里不同！！！
Left.prototype.map = function(f) {
  return this;
}
Right.prototype.map = function(f) {
  return Right.of(f(this.__value));
}
var getAge = user => user.age ? Right.of(user.age) : Left.of("ERROR!");
getAge({name: 'stark', age: '21'}).map(age => 'Age is ' + age);
getAge({name: 'stark'}).map(age => 'Age is ' + age);

// flow 函数的实现 依次执行函数 有点像多面胶函数
var flow = function(funcs) {
    var length = funcs.length
    var index = length
    while (index--) {
        if (typeof funcs[index] !== 'function') {
            throw new TypeError('Expected a function');
        }
    }
    return function(...args) {
        var index = 0
        var result = length ? funcs[index].apply(this, args) : args[0]
        while (++index < length) {
            result = funcs[index].call(this, result)
        }
        return result
    }
}
var flowRight = funcs => flow(funcs.reverse())
var IO = function(f) {
    this.__value = f
}
// IO包含的是包含返回值的函数
IO.of = x => new IO(_ => x)
IO.prototype.map = function(f) {
    return new IO(flowRight([f, this.__value]))
}


// IO 将不纯的操作带来的复杂性和不可维护性转移到IO的调用者身上 这些不纯的东西只有需要的时候才会真正的求值
var io_document = IO.of(window.document)
// var io_document = new IO(_ => window.document);
var title = io_document.map(function(doc){ return doc.title })
