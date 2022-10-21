import {ReadStream, createWriteStream} from "fs"
import {LineTransformer} from "./stream/line-transformer.js"
import {writeLine} from "./util/write-util.js";
import {mergeSort} from "./util/array-util.js";
import {EventEmitter, once} from "events"

const filePath = "./"
const dataFileName = `${filePath}test-data/random-file.txt`
const resultFileName = `${filePath}test-data/result-file.txt`
const filesCount = 10
const writers = []
let current = 0
const files = []
let signal = new EventEmitter()
let fileIndex = 0;
let arr = []

const incrementIndex = () => {
    fileIndex++
}

const resetIndex = () => {
    fileIndex = 0
}

signal.on("start", () => createFiles())

async function doNextFile(fileName) {
    if (fileName === undefined) {
        console.log("===============================")
        console.log("Все файлы отсортированы")
        resetIndex()
        await mergeFiles()
    } else {
        sortFile(fileName).then(() => {
            incrementIndex()
        })
    }
}

const createFiles = async () => {
    for (let i = 1; i <= filesCount; i++) {
        let fileName = `${filePath}test-data/${i}.txt`
        writers.push(createWriteStream(fileName))
        files.push(fileName)
        console.log("===============================")
        console.log(`Создан файл ${fileName}`)
    }

    await separateFile()
}

const separateFile = async () => {

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

        sortFiles()
    })
}

async function changeWriter() {
    if (current === filesCount - 1)
        current = 0
    else
        current++
}

async function sortFiles() {
    console.log("===============================")
    console.log("Начало сортировки файлов")
    resetIndex()

    await doNextFile(files[fileIndex])

}

async function sortFile(fileName) {
    console.log("===============================")
    console.log(`Сортировка файла: ${fileName} `)
    let reader = new ReadStream(fileName, {highWaterMark: 1024})

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

        fileWriter.on("close", () => {
            arr = []
            doNextFile(files[fileIndex])
        })

        writeArrayToFile(fileWriter).then(() => {
            fileWriter.end()
        })
    })
}

async function writeArrayToFile(fileWriter) {
    console.log("Запись на диск")
    let element
    while ((element = arr.shift()) != undefined) {
        await writeLine(fileWriter, element)
    }
}

/*Слияние файлов*/
let completed = false
let liners = []
let currentArray = []
let minimum = Infinity
let resultFile = createWriteStream(resultFileName)
let number = 0
let linerCount = filesCount
let isActive = false

async function writeElement(minimum) {
    console.log('write: ', minimum, "from line", number)
    await writeLine(resultFile, minimum)
}

function removeWritedElement(index) {
    if (currentArray.length === 0)
        return
    for (let i = 0; i < currentArray.length; i++) {
        if (currentArray[i].index === index) {
            currentArray.splice(i, 1)
        }
    }
}

async function parseData() {

    isActive = true
    console.log("start parseData(), array length:", currentArray.length)

    if (currentArray.length < linerCount) {
        console.log("Еще набрать")
        return
    } else {
        minimum = Infinity

        for (let p of currentArray) {
            console.log("P:", p)
            if (Number(p.data) < minimum) {
                minimum = Number(p.data)
                number = Number(p.index)
            }
        }

        writeElement(minimum)
            .then(() => removeWritedElement(number))

            .then(() => {
                if (liners[number] != undefined)
                    liners[number].resume()
            })
            .then(() => {
                if (completed && currentArray.length > 0)
                    console.log('Осталось', currentArray)
            })
            .then(() => {
                console.log("set active to false")
                isActive = false
            })
    }
}

function isUsedArray(array) {
    let result = false
    for (let p of array) {
        if (p !== undefined)
            result = true
    }
    return result
}

async function mergeFiles() {
    /*на случай если события data генерировать уже некому, но в массиве остались незаписанные данные*/
    let data = setInterval(() => {
            if (isActive === false) {
                if (currentArray.length === 0) {
                    clearInterval(data)
                    resultFile.close()
                } else {
                    parseData()
                }
            } else {
                console.log("set interval задача активна")
            }

        }, 500
    )

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

    for (let i = 0; i < liners.length; i++) {
        liners[i].on("end", () => {
            liners[i] = undefined
            --linerCount
            console.log(`liner ${i} end!!!!!!!!!!!!!!! linersCount: ${linerCount}`)

            if (!isUsedArray(liners)) {
                console.log("Чтение из всех потоков завершено")
                completed = true
            }

            if (!isActive) {
                console.log("liner", i, "закончился запускаю парсинг (НЕТ)")
                //nextTick(() => parseData())

            } else {
                console.log("liner", i, "закончился но парсинг происходит")
            }
        })
    }

    for (let i = 0; i < liners.length; i++) {
        liners[i].on("data", (data) => {
            currentArray.push({"index": i, "data": data})
            console.log("got from line: ", i, "data:", data)
            let liner = liners[i]

            if (liner !== undefined)
                liner.pause()

            parseData()
        })
    }


}


signal.emit("start")

/*
for (let i = 1; i <= filesCount; i++) {
    let fileName = `${filePath}test-data/${i}.txt`
    files.push(fileName)
}

mergeFiles()
*/


export {filePath}