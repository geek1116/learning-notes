Object.defineProperty(Object, 'assign', {
    value: function(target, ...args) {
        if(target === null || target === undefined) {
            throw new TypeError('Cannot convert undefined or null to object')
        }

        const to = Object(target)

        for(let i = 0; i < args.length; ++i) {
            const source = args[i]
            if(source !== null) {
                for(const key in source) {
                    if(source.hasOwnProperty(key)) {
                        to[key] = source[key]
                    }
                }
            }
        }

        return to
    },

    enumerable: false,
    writable: true,
    configurable: true
})