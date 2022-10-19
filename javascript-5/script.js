import {ReadStream, createWriteStream} from "fs"
import {LineTransformer} from "./stream/line-transformer.js"
import {writeLine} from "./util/write-util.js";
import {mergeSort, removeElement} from "./util/array-util.js";
import {EventEmitter} from "events"


const dataFileName = "./test-data/random-file.txt"
const resultFileName = "./test-data/result-file.txt"
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

    signal.on("merge-files", () => mergeFiles())
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

    let readStream = new ReadStream(dataFileName, {highWaterMark: 1024})
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
        arr = []
        fileWriter.end()
    })
}


/*Слияние файлов*/
let completed = false
let liners = []
let currentArray = []
let currentLiner
let minimum = Infinity
let object
let resultFile = createWriteStream(resultFileName)
let mergeEmitter = new EventEmitter()

mergeEmitter.on("parse-data", () => {
    parseData()
})

mergeEmitter.on("remove-element", (element) => {
    currentArray = removeElement(currentArray, element)
})

mergeEmitter.on("write-element", (number) => {
    writeLine(resultFile, number)
        .then(() => currentLiner.resume())
})

function parseData() {
    console.log(currentArray.length)
    if (currentArray.length === 0 && completed) {
        resultFile.end()
        return
    }

    if (currentArray.length < liners.length) {
        return
    } else {
        minimum = Infinity

        for (let p of currentArray) {
            if (p.data < minimum) {
                minimum = p.data
                object = p
                currentLiner = p.liner
            }
        }

        mergeEmitter.emit("remove-element", object)
        mergeEmitter.emit("write-element", minimum)
    }
}

async function mergeFiles() {
    console.log("===============================")
    console.log("Слияние файлов")

    for (let file of files) {
        let reader = new ReadStream(file, {highWaterMark: 1024})
        let liner = new LineTransformer({objectMode: true, highWaterMark: 1024})
        liners.push(liner)
        reader.pipe(liner)
    }

    resultFile.on("finish", () => {
        console.log(`Итоговый файл записан`)
    })

    for (let liner of liners) {
        liner.on("end", () => {
            removeElement(liners, liner)

            if (liners.length === 0) {
                completed = true
                return
            }
            mergeEmitter.emit("parse-data")
        })
    }




    ;(() => {
        for (let liner of liners)
            liner.on("data", (data) => {
                currentArray.push({"liner": liner, "data": Number(data)})
                liner.pause()
                mergeEmitter.emit("parse-data")
            })
    })()
}

run()