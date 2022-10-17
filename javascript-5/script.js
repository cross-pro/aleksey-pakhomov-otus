import {ReadStream, createWriteStream} from "fs"
import {LineTransformer} from "./stream/line-transformer.js"
import {writeLine} from "./util/write-util.js";
import {mergeSort} from "./util/array-util.js";
import {EventEmitter} from "events"


const testFileName = "./test-data/random-file.txt"
const filesCount = 35
const writers = []
let current = 0
const files = []
let signal = new EventEmitter()
let fileIndex = 0;

const incrementIndex = () => {
    fileIndex++
}

const resetIndex = () => {
    fileIndex = 0
}

const prepareCommands = () => {

    signal.on("start", () => createFiles())

    signal.on("separate-file", () => separateFile())

    signal.on("sort-files", () => sortFiles())

    signal.on("next-file", (fileName) => {
        if (fileName === undefined) {
            console.log("===============================")
            console.log("Все файлы отсортированы")
            resetIndex()
            signal.emit("merge-files")
        } else {
            sortFile(fileName)
            incrementIndex()
        }
    })

    signal.on("merge-files",()=> mergeFiles())
}

const createFiles = async () => {
    for (let i = 1; i <= filesCount; i++) {
        let fileName = `./test-data/${i}.txt`
        writers.push(createWriteStream(fileName))
        files.push(fileName)
        console.log("===============================")
        console.log(`Создан файл ${fileName}`)
    }

    signal.emit("separate-file")
}

const separateFile = () => {

    let readStream = new ReadStream(testFileName, {highWaterMark: 1024})
    let liner = new LineTransformer({objectMode: true})

    readStream.pipe(liner)

    liner.on('data', (line) => {
        liner.pause();

        writeLine(writers[current], line)
            .then(() => changeWriter())
            .then(() => {
                liner.resume();
            })
    });

    liner.on("end", () => {
        for (let w of writers) {
            w.end()
        }

        signal.emit("sort-files")
    })
}


function run() {

    prepareCommands()
    signal.emit("start")


}

async function changeWriter() {
    if (current === filesCount - 1)
        current = 0
    else
        current++
}

function sortFiles() {
    console.log("===============================")
    console.log("Начало сортировки файлов")
    resetIndex()

    signal.emit("next-file", files[fileIndex])
}

function sortFile(fileName) {
    console.log("===============================")
    console.log(`Сортировка файла: ${fileName} `)
    let reader = new ReadStream(fileName, {highWaterMark: 1024})
    let arr = []

    let liner = new LineTransformer({objectMode: true, highWaterMark: 1024})

    reader.pipe(liner)

    liner.on('data', (line) => {
        arr.push(Number(line))
    });

    liner.on("end", () => {
        console.log("файл, ", fileName, "загружен, элементов:", arr.length)
        arr = mergeSort(arr)
        console.log(`файл ${fileName} отсортирован`)
        let fileWriter = createWriteStream(fileName)

        fileWriter.on("close", () => signal.emit("next-file", files[fileIndex]))

        for (let n of arr) {
            fileWriter.write(n + "\n")
        }

        fileWriter.end()
    })
}

function mergeFiles() {
    console.log("===============================")
    console.log("Старт слияния файлов")
}

run()