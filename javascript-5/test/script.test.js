import {LineTransformer} from "../stream/line-transformer.js"
import {ReadStream} from "fs"
import {test, expect} from "vitest"
import {start} from "../script.js"



let expected
let reader = new ReadStream("./test/expected.txt")
let liner = new LineTransformer({objectMode: true, highWaterMark: 1024})

function load() {
    expected=[]

    reader.pipe(liner)

    liner.on("data",(data)=>{
        console.log("data:",data)
        expected.push(data)
    })
}

test("test load",()=>{
    load()

    liner.on("finish",()=>{
        console.log("liner end")
        console.log(expected.length)
        expect(expected.length).toBe(100)
    })
})

