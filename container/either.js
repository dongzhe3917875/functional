var curry = require('../curry.js')
var compose = require('../compose.js')
var trace = require('../trace.js')
var prop = curry((item, obj) => obj[item])
var map = curry((f, functor) => functor.map(f))
var add = curry((x, y) => x + y)
var concat = curry((oristr, str) => oristr.concat(str))
var moment = require('../moment.min.js')
var Left = function(x) {
	this.__value = x
}
Left.of = x => new Left(x)
Left.prototype.map = function(f) {
	return this
}

var Right = function(x) {
	this.__value = x
}
Right.of = x => new Right(x)
Right.prototype.map = function(f) {
	return new Right(f(this.__value))
}
// getAge:: Date -> User -> Either(String, Number)
// 计算出生离现在差几年

var getAge = curry((now, user) => {
	var birthDate = moment(user.birthdate, 'YYYY-MM-DD')
	// 我们根据 birthdate 的合法性来控制代码的逻辑分支
	if (!birthDate.isValid()) return Left.of('输入的名字不合法')
		return Right.of(now.diff(birthDate, 'years'))
})
console.log(getAge(moment(), {birthdate: '1989-01-25'}))
console.log(getAge(moment(), {birthdate: 'asdasda'}))
// fortune:: Number -> String
var fortune = compose(concat('if you are survive, you will be '), add(1))
// zoltar:: User -> Either(String, _)
var zoltar = compose(map(fortune), getAge(moment()))
// 如果被 map 包裹了，那么它就会从一个非 functor 函数转换为一个 functor 函数。我们把这个过程叫做 lift。
console.log(zoltar({birthdate: '1989-01-25'}))
console.log(zoltar({birthdate: 'asdasda'}))

// either:: (a -> c) -> (b -> c) -> Either a,b -> c
// either 将里面的值剥离出来
var either = curry((f, g, e) => {
	switch (e.constructor) {
		case Left: return f(e.__value)
		case Right: return g(e.__value)
	}
})

var id = e => e
var zoltareither = compose(either(id, fortune), getAge(moment()))
console.log(zoltareither({birthdate: '1989-01-25'}))
console.log(zoltareither({birthdate: 'asdasda'}))