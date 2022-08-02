function promiseReduce(asyncFunctions, reduce, initialValue) {
    async function wrapper() {
        let result

        while (asyncFunctions.length > 0) {
            result = await runTask(asyncFunctions.shift(), initialValue);
        }

        async function runTask(promise, initialValue) {
            return promise().then((memo) => reduce(memo, initialValue))
        }

        return Promise.resolve(result)
    }
    return wrapper()
}