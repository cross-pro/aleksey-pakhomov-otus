function promiseReduce(asyncFunctions, reduce, initialValue) {
    async function wrapper() {
        let result

        async function runTask(promise, memo) {
            return promise().then((value) => reduce(memo, value))
        }

        for (i = 0, memo = initialValue; i < asyncFunctions.length; i++) {
            memo = await runTask(asyncFunctions[i], memo)
            result = memo
        }
        return result
    }
    return wrapper()
}