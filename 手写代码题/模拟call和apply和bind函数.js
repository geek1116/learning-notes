Function.prototype.myCall = function(ctx, ...args) {
    const context = ctx || window

    if(typeof this !== 'function') {
        throw new TypeError('Call object is not a Function')
    }
    // 给context添加一个属性，以此来改变函数执行时的this指向
    context.fn = this

    const result = context.fn(...args)

    delete context.fn
    return result
}


Function.prototype.myApply = function(ctx, args) {
    const context = ctx || window

    if(typeof this !== 'function') {
        throw new TypeError('Call object is not a Function')
    }
    // 给context添加一个属性，以此来改变函数执行时的this指向
    context.fn = this

    if(!Array.isArray(args)) {
        throw new Error('Second argument is not an Array')
    }

    const result = context.fn(...args)

    delete context.fn
    return result
}


Function.prototype.myBind = function(ctx, ...args) {
    if(typeof this !== 'function') {
        throw new TypeError('Call object is not a Function')
    }

    const _this = this
    return function F(...args2) {
        // 使用了new关键词调用函数的情况
        if(this instanceof F) {
            return new _this(...args, ...args2)
        }

        return _this.apply(ctx, args)
    }
}