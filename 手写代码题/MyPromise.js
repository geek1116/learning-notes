class MyPromise {
    status = 'pending'
    resolvedCallback = []
    rejectedCallback = []
    resolvedValue = undefined
    rejectedRes = undefined

    constructor(executor) {
        const resolve = (val) => {
            if(this.status !== 'pending') return
            
            this.status = 'resolved'
            this.resolvedValue = val
            this.resolvedCallback.forEach(cb => cb(this.resolvedValue))
        }

        const reject = (res) => {
            if(this.status !== 'pending') return

            this.status = 'rejected'
            this.rejectedRes = res
            this.rejectedCallback.forEach(cb => cb(this.rejectedRes))
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(resolveFn, rejectFn) {
        /* 给予默认回调 */
        resolveFn = typeof resolveFn === 'function' ? resolveFn : val => val
        rejectFn = typeof rejectFn === 'function' ? rejectFn : res => { throw res }

        return new MyPromise((resolve, reject) => {
            const innerResolveFn = () => {
                try {
                    const val = resolveFn(this.resolvedValue)
                    resolve(val)
                } catch (error) {
                    reject(error)
                }
            }
            const innerRejectFn = () => {
                try {
                    const res = rejectFn(this.rejectedRes)
                    resolve(res)
                } catch (error) {
                    reject(error)
                }
            }

            if(this.status === 'pending') {
                this.resolvedCallback.push(innerResolveFn)
                this.rejectedCallback.push(innerRejectFn)

            } else if(this.status === 'resolved') {
                setTimeout(innerResolveFn, 0)

            } else if(this.status === 'rejected') {
                setTimeout(innerRejectFn, 0)
            }
        })
    }

    catch(catchFn) {
        return this.then(undefined, catchFn)
    }
}



new MyPromise((resolve, reject) => {
    console.log('1')
    resolve('hello~')
    //reject('man!')

}).then(
    res => {
        console.log('3 ', res)
        return 'world~'
        //throw new Error('custom error')
    },
    res => {
        console.log('33 ', res)
        return 'what can i say!'
        //throw new Error('custom error')
    }

).catch(res => {
    console.log('4')
    console.log('catch: ', res)

}).then(res => {
    console.log('5 ', res)
})

console.log('2')



/* new Promise((resolve, reject) => {
    reject('man!')
    // throw new Error('custom error')

}).then(
    (val) => console.log(val),
    res => {
        throw new Error('custom error')
        console.log('reject: ', res)
    }
).then(
    (val) => console.log(val),
    res => {
        console.log('reject2: ', res)
    }
)
.catch(err => {
    console.log('catch~', err)
}) */