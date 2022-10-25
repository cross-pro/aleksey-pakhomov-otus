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

const getMinimal = (arr) => {
    if (arr===undefined || arr.length===0)
        return null

    if (arr.length===1)
        return arr[0]

    let len = arr.length
    let min = arr[0]

    while (len--) {
        min = arr[len] < min ? arr[len] : min
    }
    return min

}

const removeElement = (arr, element) =>{
    const index = arr.indexOf(element)
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr
}

export {mergeSort, getMinimal, removeElement, merge}