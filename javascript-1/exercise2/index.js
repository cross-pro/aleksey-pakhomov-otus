const sum = function() {
    let counter
    return function summator(argument) {
        if (!argument) {
            let result = counter
            counter = undefined //сбросывает для следующиего вызова
            return result
        } else {
            if (!counter)
                counter = 0
            counter += argument
            return (nextParam) => {
                return summator(nextParam)
            }
        }
    }
}()