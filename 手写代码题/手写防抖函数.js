function debounce(func, wait, immediate) {
    let timer
    
    let debounced = function(...args) {
        const context = this

        if(timer) clearTimeout(timer)

        if(immediate) {
            const callNow = !timer

            timer = setTimeout(function() {
                timer = null
            }, wait)

            if(callNow) return func.apply(context, args)
        } else {
            timer = setTimeout(function() {
                func.apply(context, args)
            }, wait)
        }
    }

    debounced.cancel = function() {
        clearTimeout(timer)
        timer = null
    }

    return debounced
}