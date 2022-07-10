const sum = function (...args) {
    let counter = 0;

    const getSum = (...args) => {
        let sumValue = 0;
        for (i = 0; i < args.length; i++) {
            sumValue = sumValue + args[i];
        }
        counter += sumValue;
        return sumValue;
    }

    return function (...args) {
        if (args.length === 0)
            return counter;
        else
            return getSum(...args);
    }
}()