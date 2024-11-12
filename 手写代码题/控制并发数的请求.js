const MAX_SYNC_COUNT = 5
const reqPool = []

let currentCount = 0

function getData(data) {
    const p = new Promise((resolve, reject) => {
        reqPool.push(resolve)
        flushPool()
    })

    return p.then(() => {
        fetch(data).then(res => {
            return res
        })
    })
}

function flushPool() {
    if(currentCount >= MAX_SYNC_COUNT) return

    // todo
}


export {
    getData
}