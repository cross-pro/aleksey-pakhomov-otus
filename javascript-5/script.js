import {ReadStream, createWriteStream} from "fs"
import {LineTransformer} from "./stream/line-transformer.js"
import {writeLine} from "./util/write-util.js";
import {mergeSort, removeElement, getMinimal} from "./util/array-util.js";
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

        fileWriter.end()
    })
}

async function mergeFiles() {
    console.log("===============================")
    console.log("Слияние файлов")

    let isActive = false
    let numberFiles = filesCount
    let liners = []
    let arrayStream = []
    let currentArray = []
    let resultFile = createWriteStream(resultFileName)

    let mergeEmitter = new EventEmitter()

    let currentLiner = 0

    const resetLiner = () => {
        currentLiner = 0
    }

    const incLiner = () => {
        currentLiner++

        if (currentLiner === numberFiles) {
            resetLiner()
            mergeEmitter.emit("write-array")
        }
    }

    for (let file of files) {
        let reader = new ReadStream(file, {highWaterMark: 1024})
        let liner = new LineTransformer({objectMode: true, highWaterMark: 1024})
        liners.push(liner)
        reader.pipe(liner)
    }

    resultFile.on("finish", () => {
        console.log(`Итоговый файл записан`)
    })

    mergeEmitter.on("write-array", () => {
        processArray()
    })

    mergeEmitter.on("wake-up-liners", () => {
        if (liners.length === 0)
            mergeEmitter.emit("write-array")
        else
            for (let liner of liners) {
                try {
                    liner.resume()
                } catch (e) {
                    console.error(e)
                }
            }
    })

    async function processArray() {
        isActive = true
        let minValue
        if (currentArray.length == 0 && arrayStream.length === 0) {
            resultFile.end()
            return
        }

        console.log("==============================\n")
        console.log("current: ", currentArray, "general:", arrayStream)

        if (currentArray.length === 0) {
            minValue = arrayStream[arrayStream.length - 1]
        } else {
            /*минимальное значение для текущей итерации*/
            minValue = getMinimal(currentArray)

            arrayStream = arrayStream.concat(currentArray)
            currentArray = []
            arrayStream = mergeSort(arrayStream)
            console.log("sorted:", arrayStream)

            console.log("В памяти находится", arrayStream.length, "элементов, min:", minValue)
        }


        w().then(() => console.log("end w()"))
            .then(()=>isActive = false)
            .then(() => mergeEmitter.emit("wake-up-liners"))

        async function w() {
            for (let i = 0; i < arrayStream.length; i++) {
                let n = arrayStream[i]
                if (n <= minValue)
                    writeLine(resultFile, n)
                        .then(() => console.log("write:", n))
                        .then(() => removeElement(arrayStream, n))
                else {
                    return
                }
            }
        }
    }

    for (let liner of liners) {
        liner.on("end", () => {
            numberFiles--
            removeElement(liners, liner)
            console.log("liner end, count:", liners.length)

            if (liners.length === 0 || isActive === false) {
                mergeEmitter.emit("write-array")
            }
        })
    }

    ;(() => {
        for (let liner of liners)
            liner.on("data", (data) => {
                currentArray.push(Number(data))
                liner.pause()
                incLiner()
            })
    })()
}

run()