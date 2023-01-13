function throttle(func, wait, options={ leading: true, trailing: true }) {
    let timer = null, previous = 0

    let throttled = function(...args) {
        const context = this, now = new Date().valueOf()

        if(!previous && !options.leading) previous = now

        const remainTime = wait - (now - previous)  // 剩余时间
        
        if(remainTime <=0 || remainTime > wait) {   // 剩余时间小于0 或者手动修改了系统时间
            if(timer) {     // 修改系统时间的的case会走到这里
                clearTimeout(timer)
                timer = null
            }

            previous = now
            return func.apply(context, args)

        } else if(!timer && options.trailing) {
            timer = setTimeout(function() {
                previous = options.leading === false ? 0 : new Date().valueOf()
                timer = null
                func.apply(context, args)
            }, remainTime)
        }
    }

    throttled.cancel = function() {
        previous = 0
        clearTimeout(timer)
        timer = null
    }

    return throttled
}