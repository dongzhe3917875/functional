var curry = require('../curry.js')
var compose = require('../compose.js')
var trace = require('../trace.js')
var map = require('../map.js')
var Container = require('../container.js')
var Maybe = require('../maybe.js')
var prop = curry((item, obj) => obj[item])
var Task = require('data.task')
var IO = require('../IO.js')
// 练习 1
// ==========
// 使用 _.add(x,y) 和 _.map(f,x) 创建一个能让 functor 里的值增加的函数
var add = curry((x, y) => x + y)
// ex1:: Number -> functor
// var ex1 = compose(map(add(1)), Container.of)
// ex1:: Number -> String
var ex1 = compose(inspect, map(add(1)), Container.of)
console.log(ex1(2))
//练习 2
// ==========
// 使用 _.head 获取列表的第一个元素
var head = x => x[0]
var xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
// ex2:: functor -> functor
var ex2 = map(head)
console.log(ex2(xs))

// 练习 3
// ==========
// 使用 safeProp 和 _.head 找到 user 的名字的首字母
var safeProp = curry((x, o) => Container.of(o[x]));
var user = { id: 2, name: "Albert" };
// ex3:: Object -> functor
var ex3 = compose(map(head), safeProp('name'))
console.log(ex3(user))

// 练习 4
// ==========
// 使用 Maybe 重写 ex4，不要有 if 语句

// var ex4 = function (n) {
//   if (n) { return parseInt(n); }
// }
// ex4:: Number -> functor 
var ex4 = compose(map(parseInt), Maybe.of)
console.log(ex4())
console.log(ex4('88hh5'))

// 练习 5
// ==========
// 写一个函数，先 getPost 获取一篇文章，然后 toUpperCase 让这片文章标题变为大写

// getPost :: Int -> Future({id: Int, title: String})
var getPost = i => new Task((rej, res) => setTimeout(() => res({id: i, title: 'Love them futures'}), 300))
var toUpperCase = x => x.toUpperCase()
// ex5:: Int -> Task(String)
var ex5 = compose(map(compose(toUpperCase, prop('title'))), getPost)
ex5(5).fork(err => err, data => console.log(data))

// 练习 6
// ==========
// 写一个函数，使用 checkActive() 和 showWelcome() 分别允许访问或返回错误
var Left = require('../Either.js').Left
var Right = require('../Either.js').Right
var showWelcome = compose(add( "Welcome "), prop('name'))

var user = {
	active: true,
	name: 'dongzhe'
}
var checkActive = user => user.active ? Right.of(user) : Left.of('Your account is not active')
// ex6:: user -> Either(String, String)
var ex6 = compose(map(showWelcome), checkActive)
console.log(ex6(user))

// 练习 7
// ==========
// 写一个验证函数，检查参数是否 length > 3。如果是就返回 Right(x)，否则就返回
// Left("You need > 3")

var ex7 = (...args) => args.length > 3 ? Right.of(args) : Left.of('You need > 3')
console.log(ex7(1, 2))
console.log(ex7(1, 2, 3, 4))

// 练习 8
// ==========
// 使用练习 7 的 ex7 和 Either 构造一个 functor，如果一个 user 合法就保存它，否则
// 返回错误消息。别忘了 either 的两个参数必须返回同一类型的数据。
var either = curry((f, g, e) => {
	switch (e.constructor) {
		case Left: return f(e.__value)
		case Right: return g(e.__value)
	}
})
var save = x => new IO(_ => {
	console.log("SAVED USER!");
	return x + '-saved';
})
// either 的两个参数必须返回同一类型的数据。
var ex8 = compose(either(IO.of, save), ex7)
console.log(ex8(1, 2, 3, 4))
