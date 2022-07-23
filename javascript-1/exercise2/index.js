const sum = function() {
    return function summator(argument, lastValue = 0) {
        if (!argument) {
            return lastValue
        } else {
            return (nextParam) => {
                return summator(nextParam, lastValue + argument)
            }
        }
    }
}()