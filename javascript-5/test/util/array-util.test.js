import {mergeSort} from "../../util/array-util.js"
import {test, expect} from "vitest"

test("test sorting", () => {
    let arr = [9, 29, 2999, 3, 4, 1001,7, 1000, 6, 1, 2, 5, 8]
    let expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 29, 1000, 1001, 2999]

    let result = mergeSort(arr)
    console.log("result:", result)
    expect(mergeSort(arr)).toStrictEqual(expected)
})


