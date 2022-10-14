import { createReadStream } from "fs"
import {LineStreamReader} from "./line-stream-reader.js"


// for await (const k of readable) {
//     data += k
// }
// const readStream = createReadStream('./test-data/test.txt', { encoding: 'utf8', highWaterMark: 100})
// async function print() {
//     for await (const chunk of readStream) {
//         console.log("got chunk:",chunk)
//     }
// }

// print()

let lineReader = new LineStreamReader();


lineReader.on('data', chunk => {
    console.log(`Received: ${chunk.toString()}`);
});

lineReader.on("end",()=>{
    console.log("task completed")
})


