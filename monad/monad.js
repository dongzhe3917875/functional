// pointed functor 是实现了 of 方法的 functor。
// 这里的关键是把任意值丢到容器里然后开始到处使用 map 的能力。
// 实现这种接口的动机是，我们希望能有一种通用、一致的方式往 functor 里填值，而且中间不会涉及到复杂性，也不会涉及到对构造器的特定要求
// 默认最小化上下文
var curry = require('../curry.js')
var compose = require('../compose.js')
var trace = require('../trace.js')
var map = require('../map.js')
var Container = require('../container.js')
var Maybe = require('../maybe.js')
var prop = curry((item, obj) => obj[item])
var Task = require('data.task')
var IO = require('../IO.js')
var safeProp = curry((x, obj) => new Maybe(obj[x]))
var safeHead = safeProp(0)
var firstAddressStreet = compose(map(map(safeProp('street'))),map(safeHead), safeProp('addresses'))
// map(map(safeProp('street'))), 
// 
var join = function(mma){ return mma.join()}
var chain = curry((f, frr) => frr.chain(f))
var firstAddressStreetUp = compose(join, map(safeProp('street')), join, map(safeHead), safeProp('addresses'))
// chain => m.map(f).join()
var firstAddressStreetchain = compose(chain(safeProp('street')), chain(safeHead), safeProp('addresses'))
console.log(firstAddressStreet(
  {addresses: [{street: {name: 'Mulburry', number: 8402}, postcode: "WC2N" }]}
))
// safeProp('addresses') -> Maybe([{street: {name: 'Mulburry', number: 8402}, postcode: "WC2N" }])
// map(safeHead) Maybe(Maybe({street: {name: 'Mulburry', number: 8402}, postcode: "WC2N" }))
// map(map(safeProp('street')))(Maybe(Maybe({street: {name: 'Mulburry', number: 8402}, postcode: "WC2N" })))
// Maybe(map(safeProp('street')), Maybe({street: {name: 'Mulburry', number: 8402}, postcode: "WC2N" }))
// Maybe(Maybe(safeProp('street')({street: {name: 'Mulburry', number: 8402}, postcode: "WC2N" })))
// Maybe(Maybe(Maybe({name: 'Mulburry', number: 8402})))
// monad 是可以变扁（flatten）的 pointed functor
console.log(firstAddressStreetUp(
  {addresses: [{street: {name: 'Mulburry', number: 8402}, postcode: "WC2N" }]}
))
console.log(firstAddressStreetchain(
  {addresses: [{street: {name: 'Mulburry', number: 8402}, postcode: "WC2N" }]}
))

//  log :: a -> IO a
var log = function(x) {
  return new IO(function() { console.log(x); return x; });
}

//  setStyle :: Selector -> CSSProps -> IO DOM
var setStyle = curry(function(sel, props) {
  return new IO(function() { return jQuery(sel).css(props); });
});

//  getItem :: String -> IO String
var getItem = function(key) {
  return new IO(function() { return localStorage.getItem(key); });
};

//  applyPreferences :: String -> IO DOM
var applyPreferences = compose(
  join, map(setStyle('#main')), join, map(log), map(JSON.parse), getItem
);


applyPreferences('preferences').unsafePerformIO();
// Object {backgroundColor: "green"}
// <div style="background-color: 'green'"/>
var getJSON = curry((url, param) => new Task((reject, result) => $.getJSON(url, param, result).fail(reject)))
getJSON('/authenticate', {username: 'stale', password: 'crackers'})
  .chain(function(user) {
    return getJSON('/friends', {user_id: user.id});
});
var querySelector = function(selector) {
  return new IO(function(){ return document.querySelectorAll(selector); });
}
querySelector("input.username").chain(function(uname) {
  return querySelector("input.email").chain(function(email) {
    return IO.of(
      "Welcome " + uname.value + " " + "prepare for spam at " + email.value
    );
  });
});
