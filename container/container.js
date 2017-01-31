var curry = require('../curry.js')
var compose = require('../compose.js')
var trace = require('../trace.js')
var prop = curry((item, obj) => obj[item])
var Container = function(x) {
	this.__value = x
}
Container.of = x => new Container(x)
console.log(Container.of(Container.of({name: "yoda"})))
console.log(Container.of(3))

// (a -> b) -> Container a -> Container b
// a 是 Container a 的值， Container a 的值根据(a-b) 成为了 Container b
Container.prototype.map = function(f){
  return Container.of(f(this.__value))
}
// map:: (a -> b) -> Container a -> Container b
// map :: Functor f => (a -> b) -> f a -> f b

// 链式调用
// Container.of("bombs").map(concat(' away')).map(_.prop('length'))
// functor 是实现了 map 函数并遵守一些特定规则的容器类型。
// 让容器自己去运用函数能给我们带来什么好处？答案是抽象，对于函数运用的抽象。

var Maybe = function(x) {
  this.__value = x;
}

Maybe.of = function(x) {
  return new Maybe(x);
}

Maybe.prototype.isNothing = function() {
  return (this.__value === null || this.__value === undefined);
}

Maybe.prototype.map = function(f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
}
// map :: Functor f => (a -> b) -> f a -> f b
var map = curry((f, functor) => functor.map(f))
// demo
var safeHead = x => x[0]
var streetName = compose(map(prop('street')), map(safeHead), trace("Maybe"), Maybe.of, prop('addresses'))
console.log(streetName({addresses: [{street: "Shady Ln.", number: 4201}]}));
console.log(streetName({addresses: []}))
// withdraw
// withdraw:: Number -> Account -> Maybe(Account)
var withdraw = curry((amount, account) => account.balance >= amount ? Maybe.of(account.balance - amount) : Maybe.of(null))
var remainingBalance = balance => {
	console.log('您的余额为' + balance + '元')
	return balance
}
var updateLedger = balance => {
	console.log('update...')
	return balance
}
var finishTransaction = compose(remainingBalance, updateLedger)
var getTwenty = compose(map(finishTransaction), withdraw(20))
console.log(getTwenty({ balance: 200.00}))
console.log(getTwenty({ balance: 10.00}))
// 写一个获取数据的借口
// 第一个参数 是为null的提升
// 第二个参数 是处理函数
// 第三个参数 是Maybe对象
// 返回值 为真正暴露的值 而不是map后的Maybe对象
// a, b代表一个类型 a为Maybe的值 b为一个具体的值 Maybe(a) 为a,b对象
// maybe:: b -> (a -> b) -> Maybe(a) -> b
var maybe = curry((val, func, functor) => functor.isNothing() ? val : func(functor.__value))
var getTwentymaybe = compose(maybe("对不起，您的余额不足", finishTransaction), withdraw(20))
console.log(getTwentymaybe({ balance: 200.00}))
console.log(getTwentymaybe({ balance: 10.00}))

