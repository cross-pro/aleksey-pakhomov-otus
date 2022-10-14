const merge = (left, right) => {
    const arrSort = []
    let i = 0
    let j = 0

    while (i < left.length && j < right.length) {
        arrSort.push(
            (left[i] < right[j]) ?
                left[i++] : right[j++]
        )
    }

    return [
        ...arrSort,
        ...left.slice(i),
        ...right.slice(j)
    ]
}


const mergeSort = (arr) => {
    if (arr === undefined || arr === null || arr.length === 0)
        return null;

    if (arr.length == 1)
        return arr

    let middle = Math.floor(arr.length / 2)

    let left = arr.slice(0, middle)
    let right = arr.slice(middle)

    return merge(mergeSort(left), mergeSort(right))

}

export {mergeSort}