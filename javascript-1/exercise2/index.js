const sum = function() {
    return function summator(argument, lastValue = 0) {
        return (!argument) ? lastValue : (nextParam) => summator(nextParam, lastValue + argument)
    }
}()