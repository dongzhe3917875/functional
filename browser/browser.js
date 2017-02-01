// import Task from 'data.task'
var prop = curry((item, obj) => obj[item])
var getJSON = curry((url, param) => new Task((reject, result) => $.getJSON(url, param, result).fail(reject)))
getJSON('http://dongzhe.ml/json/test.json', {}).map(prop('rows')).fork(error => $('.error').html(error), page => $('.page').html(page))