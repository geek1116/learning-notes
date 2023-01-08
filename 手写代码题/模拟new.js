function mynew(creator, ...args) {
    if(typeof creator !== 'function') {
        throw new Error('creator is not a function!')
    }

    const obj = new Object()
    obj.__proto__ = creator.prototype   // 修改对象的原型指向
    
    const ret = creator.apply(obj, args)

    return typeof ret === 'object' ? ret : obj  // 构造函数crator中可能会主动返回对象
}