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
module.exports = memorized
// var sin = memorized(x => Math.sin(x))
// console.log(sin(1))