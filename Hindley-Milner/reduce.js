// 1.类型签名
var curry = require('./curry.js')
// filter 很好理解
//  filter :: (a -> Bool) -> [a] -> [a]
var filter = curry(function(f, xs){
  return xs.filter(f);
});
// reduce:: (result -> array -> result) -> result -> [array] -> result
// (输入的某一项（init or result） 和 array 中的一项 组合生成一个result, init(result), [array] ->> result
var reduce = curry((f, init, arr) => arr.reduce(f, init))

// 2.缩小可能性范围
// parametricity
// 这个特性表明，函数将会以一种统一的行为作用于所有的类型
// head :: [a] -> a
// reverse :: [a] -> [a]

// 3/自由定理
// head :: [a] -> a
compose(f, head) == compose(head, map(f));

// filter :: (a -> Bool) -> [a] -> [a]
compose(map(f), filter(compose(p, f))) == compose(filter(p), map(f));

// 类型约束
// => 之前规定了类型
// sort :: Ord a => [a] -> [a]