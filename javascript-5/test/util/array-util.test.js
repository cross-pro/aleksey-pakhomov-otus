import {mergeSort, getMinimal, removeElement} from "../../util/array-util.js"
import {test, expect} from "vitest"

test("test sorting", () => {
    let arr = [9, 29, 2999, 3, 4, 1001,7, 1000, 6, 1, 2, 5, 8]
    let expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 29, 1000, 1001, 2999]

    let result = mergeSort(arr)
    console.log("result:", result)
    expect(mergeSort(arr)).toStrictEqual(expected)
})


test("get minimal value from array", ()=> {
    let arr = [9, 29, 2999, 3, 4, 1001,7, 1000, 6, 1, 2, 5, 8]

    expect(getMinimal(arr)).toBe(1)

    let empty = getMinimal([])
    expect(empty).toBe(null)
})

test("remove element", ()=>{
    let arr = [9, 29, 2999, 3, 4, 1001,7, 1000, 6, 1, 2, 5, 8]
    let expected = [9, 2999, 3, 4, 1001,7, 1000, 6, 1, 2, 5, 8]
    removeElement(arr, 29)
    expect(arr).toStrictEqual(expected)

    let oneArray=[9]
    removeElement(oneArray,9)
    expect(oneArray.length).toBe(0)

    let strArray = ['9']
    removeElement(strArray,9)
    expect(strArray.length).toBe(0)


})

