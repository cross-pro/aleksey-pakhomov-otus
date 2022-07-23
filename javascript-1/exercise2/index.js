const sum = function() {
    return function summator(argument, lastValue = 0) {
        return (!argument) ? lastValue : (nextParam) => {
            return summator(nextParam, lastValue + argument)
        }
    }
}()