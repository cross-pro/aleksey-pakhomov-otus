function promiseReduce(asyncFunctions, reduce, initialValue) {
    return Promise.resolve(
        Promise.all([
            fn1().then(new Promise((p) => reduce(p, initialValue))),
            fn2().then((param) => reduce(param, initialValue))
        ])
    ).then(p => p.pop())
}