import {ReadStream, createWriteStream} from "fs"
import {LineTransformer} from "./stream/line-transformer.js"
import {writeLine} from "./util/write-util.js";
import {mergeSort} from "./util/array-util.js";


const filesCount = 5
const writers = []
let current = 0
const files = []

let readStream = new ReadStream("./test-data/random-file.txt", {highWaterMark: 1024})
let liner = new LineTransformer({objectMode: true})


function run() {
    for (let i = 1; i <= filesCount; i++) {
        let fileName = `./test-data/${i}.txt`
        writers.push(createWriteStream(fileName))
        files.push(fileName)
    }

    readStream.pipe(liner)

    liner.on('data', (line) => {
        liner.pause();

        writeLine(writers[current], line)
            .then(() => changeWriter())
            .then(() => {
                liner.resume();
            })
    });


    //writeLine(writers[current], line)
    //changeWriter()



    liner.on("end", () => {
        for (let w of writers) {
            w.end()
        }
    })

    //sortFiles()
}

function changeWriter() {
    if (current === filesCount - 1)
        current = 0
    else
        current++
}

function sortFiles() {
    for (let i = 0; i < files.length; i++) {
        sortFile(files[i])
    }
}

function sortFile(fileName) {
    console.log(`Сортировка файла: ${fileName}`)
    let reader = new ReadStream(fileName, {highWaterMark: 1024})
    let arr = []

    let fileLiner = new LineTransformer({objectMode: true, highWaterMark: 1024})

    fileLiner.on("readable", function () {
        let line

        while (null !== (line = fileLiner.read())) {
            arr.push(line)
        }
    })

    fileLiner.on("end", () => {
        console.log(arr)


        /*let fileWriter = createWriteStream(fileName)
        arr.map(p=> writeLine(fileWriter, p))

        fileWriter.end()*/
    })

    reader.pipe(fileLiner)

}

run()