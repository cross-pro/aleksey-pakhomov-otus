const sum = function() {
    return function summator(argument, lastValue = 0) {
        return (argument == undefined) ? lastValue : (nextParam) => summator(nextParam, lastValue + argument)
    }
}()