function myInstanceof(obj, fn) {
    if(typeof obj !== 'object' || object === null || typeof fn !== 'function') {
        return false
    }

    let proto = obj.__proto__
    
    while(proto) {  // 原型链的尽头为undefined
        if(proto === fn.prototype) return true

        proto = proto.__proto__
    }
}