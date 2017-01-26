var arr = [1,2,3,4,5]
// 函数缓存
var memorized = function(func) {
    memorized.cache = new Map();
    return function(...args) {
        const key = args[0];
        const cache = memorized.cache;
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = func.apply(this, args)
        memorized.cache = cache.set(key, result)
        return result
    }
}
var sin = memorized(x => Math.sin(x))
console.log(sin(1))
// 函数柯里化
// 传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数
var add = x => y => x + y 
var checkage = min => age => age > min
// 某种意义上讲，这是一种对参数的“缓存”
var curry = function(fn) {
    // 取得函数参数的数量
    var limit = fn.length
    // 命名函数
    return function f1(...args) {
        // 按照 lodash, 当所有参数大于等于 fn 的长度，就返回结果 执行f1 根据参数判断是否缓存参数结束 结束执行 没有结束 返回一个记住参数的函数
        if (args.length >= limit) {
            return fn.apply(null, args)
        } else {
            return function f2(...args2) {
                // 的确是在不断的缓存参数 每次缓存参数都有可能返回一个函数
                return f1.apply(null, args.concat(args2))
            }
        }
    }
}

var match = curry((reg, str) => str.match(reg)); // match === f1
var haveSpace = match(/\s+/g); // haveSpace === f1(reg) === f2 
haveSpace('hello world')
var filter = curry((f, arr) => arr.filter(f));
console.log(filter(haveSpace, ['ssssss', 'hello world']))

// 双面胶代码
var compose2 = (f, g) => x => f(g(x))
var add1 = x => x + 1
var mul5 = x => x * 5
console.log(compose2(mul5, add1)(2))
var first = arr => arr[0];
var reverse = arr => arr.reverse();
var last = compose2(first, reverse)
console.log(last([1,2,3,4,5]))
// 多面胶代码
var compose = function(...args) {
    return function f1(x) {
        var result = args.pop()(x)
        if (args.length === 0) {
            return result
        } else {
            return f1.call(null, result)
        }
    }
}
var add1 = x => x + 1
var mul5 = x => x * 5
var minus3 = x => x - 3
console.log(compose(mul5, add1, minus3)(10))

// point free style
// entirely composed of other smaller, generic and reusable functions!
// 一个函数真正的只干一件事情
// http://lucasmreis.github.io/blog/pointfree-javascript/

// 命令式style imperative style
// imperative style
// it returns all the emails of the users with admin role.
var getAdminEmails_imperative = function(users) {
  var emails = [];
  for (var i = 0; i < users.length; i++) {
    if (users[i].role === 'admin') {
      emails.push(users[i].email);
    }
  }
  return emails;
}
// 函数式style functional style
var getAdminEmails_functional = users =>
    users
      .filter(u => u.role === 'admin')
      .map(u => u.email);
// ponit free style

// 取值函数
var prop = p => x => x[p]
// map
var map = f => list => list.map(f)
// mapemail
var getTheEmailsOf = map(prop('email'))

// propEq
var propEq = v => p => obj => prop(p)(obj) === v
// filter
var filter = f => list => list.filter(f)
// onlyTheAdminRoleUsers
var onlyTheAdminRoleUsers = filter(propEq('admin')('role'))
var getAdminEmails_ponitfree = compose(
  getTheEmailsOf,
  onlyTheAdminRoleUsers);
var test = [{
    role: 'user',
    email: 'dz@360.cn'
}, {
    role: 'admin',
    email: 'admin@360.cn'
}, {
    role: 'admin',
    email: 'adminadmin@360.cn'
}] 
getAdminEmails_ponitfree(test)
