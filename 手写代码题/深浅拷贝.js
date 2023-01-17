/*
    浅拷贝：
    作为对象类型，可以通过Object.assign和拓展运算符{...}解决
    数组类型还可以用slice/concat方法实现
 */

// 通用的浅拷贝函数
function shallowCopy(obj) {
    if(typeof obj !== 'object') {
        throw new Error('param is not an Object')
    }

    const newObj = obj instanceof Array ? [] : {}
    // 遍历obj，判断是obj自身的属性才拷贝
    for(let key of obj) {
        newObj[key] = obj[key]
    }

    return newObj
}


/* 
    深拷贝：
    可以直接使用JSON.parse(JSON.stringify(obj))，但会有以下四个局限：
    1. 忽略undefined
    2. 忽略symbol
    3. 不能序列化函数
    4. 存在循环引用时会报错
 */

// 深拷贝函数（但没有考虑DOM对象、正则对象、时间对象等）
function cloneDeep(obj) {
    if(Array.isArray(obj)) {
        return obj.map(cloneDeep)   // 对数组每个元素调用cloneDeep来返回一个新数组
    } else if(obj && typeof obj === 'object') {
        const newObj = {}
        for(let key of obj) {
            newObj[key] = cloneDeep(obj[key])
        }

        return newObj
    } else {                        // 为null、undefined等的情况
        return obj
    }
}