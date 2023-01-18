import {test, expect} from "vitest"
import { getMin, getMax } from "../util/exercise-generator"

test("getMin()", ()=>{
    expect(getMin(1)).toBe(1)
    expect(getMin(2)).toBe(10)
    expect(getMin(3)).toBe(100)
    expect(getMin(4)).toBe(1000)
    expect(getMin(5)).toBe(10000)
    expect(getMin(6)).toBe(100000)
    expect(getMin(7)).toBe(1000000)
    expect(getMin(8)).toBe(10000000)
    expect(getMin(9)).toBe(100000000)
    expect(getMin(10)).toBe(1000000000)
})

test("getMax()",()=>{
    expect(getMax(1)).toBe(9)
    expect(getMax(2)).toBe(99)
    expect(getMax(3)).toBe(999)
    expect(getMax(4)).toBe(9999)
    expect(getMax(5)).toBe(99999)
    expect(getMax(6)).toBe(999999)
    expect(getMax(7)).toBe(9999999)
    expect(getMax(8)).toBe(99999999)
    expect(getMax(9)).toBe(999999999)
    expect(getMax(10)).toBe(9999999999)
})