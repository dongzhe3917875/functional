// import Task from 'data.task'
var prop = curry((item, obj) => obj[item])
var getJSON = curry((url, param) => new Task((reject, result) => $.getJSON(url, param, result).fail(reject)))
getJSON('http://dongzhe.ml/json/test.json', {}).map(prop('rows')).fork(error => $('.error').html(error), page => $('.page').html(page))

function Task(computation, cleanup) {
  this.fork = computation;

  this.cleanup = cleanup || function() {};
}
Task.prototype.of = function _of(b) {
  return new Task(function(_, resolve) {
    return resolve(b);
  });
};

Task.of = Task.prototype.of;

Task.prototype.rejected = function _rejected(a) {
  return new Task(function(reject) {
    return reject(a);
  });
};

Task.rejected = Task.prototype.rejected;

Task.prototype.map = function _map(f) {
  var fork = this.fork;
  var cleanup = this.cleanup;

  return new Task(function(reject, resolve) {
    return fork(function(a) {
      return reject(a);
    }, function(b) {
      return resolve(f(b));
    });
  }, cleanup);
};
// 几乎所有的异步操作都是有副作用的 因为依赖于外部的状态
// Task有点像IO，可以看出computation就是一个函数 一般包含两项 reject resolve
// (reject, result) => $.getJSON(url, param, result).fail(reject) 这个fork就是这个函数
// 对于这个异步操作 我们把result这个resolve放到异步回调函数的位置
// 这个函数接受两个参数 两个参数都是函数，其中第一个函数接收一个err参数，第二个函数接收data参数
// 下面来看map函数 map函数的意义就是对异步回调的数据进行一个处理 所以传入的是一个函数 为了链式调用
// 返回的也必须是一个Task Task里面必须是一个函数 赋值给fork，相比较IO的 map return new IO(compose(f, this.__value))
// 这些函数都是延迟执行的 map返回的也是一个Task Task的执行就是执行 Task.fork(function(a), function(data))
// function(data) 就是resolve 处理的数据就是f(b) 我们在执行fork的时候 本例子的过程如下
// func = prop('rows')
// Task(asynchronous).map(func)
// fork : (dataprocess, errprocess) => $.getJSON(url, param, function(data) {return dataprocess(fprop(data))}).fail(function(err){ return errprocess(err)})
// Task(asynchronous).map(func).fork(errprocess, dataprocess)
// $.getJSON(url, param, function(data) {return dataprocess(fprop(data))}).fail(function(err){ return errprocess(err)})

Task.prototype.chain = function _chain(f) {
  var fork = this.fork;
  var cleanup = this.cleanup;

  return new Task(function(reject, resolve) {
    return fork(function(a) {
      return reject(a);
    }, function(b) {
      return f(b).fork(reject, resolve);
    });
  }, cleanup);
};
// 什么时候用chain 当一个f返回的还是一个Task（有可能接连调用异步函数）也就是f(b)
// 所以为了避免嵌套的Task，要及时的把chain函数从Task中解放出来 f(b)要及时的fork

var chain = getJSON('/authenticate', {username: 'stale', password: 'crackers'})
  .chain(function(user) {
    return getJSON('/friends', {user_id: user.id});
})
// 过程分析
// fork : (dataprocess, errprocess) => $.getJSON(url, param, function(data) {return fJSON(data).fork((dataprocess, errprocess))}).fail(function(err){ return errprocess(err)})
