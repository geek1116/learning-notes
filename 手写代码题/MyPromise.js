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
            this.flushCallback()
        }

        const reject = (res) => {
            if(this.status !== 'pending') return

            this.status = 'rejected'
            this.rejectedRes = res
            this.flushCallback()
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    flushCallback() {
        if(this.status === 'resolved') {
            this.resolvedCallback.forEach(cb => cb(this.resolvedValue))
        }

        if(this.status === 'rejected') {
            this.rejectedCallback.forEach(cb => cb(this.rejectedRes))
        }
    }

    then(resolveFn, rejectFn) {
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
        // todo
    }
}

const p = new MyPromise(function(resolve, reject) {
    console.log('promise start')
    resolve('man')
    //reject('no!')

}).then(
    (val) => {
        console.log('hi~ ', val)
        return 'val in then1'

    }, (res) => {
        console.log('555~ ', res)
    }
).then(
    (val) => {
        console.log('hi~ ', val)
    }
)

/* new Promise((resolve, reject) => {
    throw new Error('custom error')

    resolve('man!')

}).then((val) => console.log(val), res => console.log('err: ', res))
.catch(err => {
    console.log('catch~', err)
}) */