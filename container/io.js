//  getFromStorage :: String -> (_ -> String)
var getFromStorage = function(key) {
  return function() {
    return localStorage[key];
  }
}
// 在这里我们返回的是一个函数
// 同一个输入就总能返回同一个输出：一个从 localStorage 里取出某个特定的元素的函数。
// 这个函数总是不会变的