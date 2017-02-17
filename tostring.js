function add(x){
    var num = x;
    function _add(para){
        num+=para;
        return _add;
    }
    _add.toString=function(){
        return num;
    }
    return _add;
}


var a = add(1)(2)(3);
console.log(a);//6
console.log((a+7));//13
console.log(a(11));//17