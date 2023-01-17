function curry(fn) {
    if(typeof fn !== 'function') {
        throw new Error('param is not a Function')
    }
    const paramNums = fn.length

    return function inner(...args) {
        return args.length >= paramNums
        ?   fn.apply(this, args)
        :   function(...args2) {
            return inner.apply(this, [...args, ...args2])
        }
    }
}


/* -------------------------------------------------- */


function addSum(a, b, c) {
    return a + b + c
}

const addSumCurry = curry(addSum)
// 输出结果都为6
addSumCurry(1)(2)(3)
addSumCurry(1, 2)(3)
addSumCurry(1, 2, 3)


/* -------------------------------------------------- */


function addAndPrintProperty(a, b) {
    console.log('name is ' + this.name)
    return a + b
}

const obj = {
    name: 'Tom'
}
// name is Tom
// 3
obj.fn = curry(addAndPrintProperty)
console.log(obj.fn(1, 2))