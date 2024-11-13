const MAX_SYNC_COUNT = 5
const reqPool = []

let currentCount = 0

function getData(data) {
    const p = new Promise((resolve, reject) => {
        reqPool.push(resolve)
        flushPool()
    })

    return p.then(() => {
        return fetch(data).then(res => {
            return res

        }).catch(err => {
            throw err

        }).finally(() => {
            --currentCount
            flushPool()
        })
    })
}

function flushPool() {
    if(currentCount >= MAX_SYNC_COUNT) return

    while(currentCount < MAX_SYNC_COUNT && reqPool.length > 0) {
        const resolve = reqPool.shift()
        resolve()
        ++currentCount
    }
}


export {
    getData
}