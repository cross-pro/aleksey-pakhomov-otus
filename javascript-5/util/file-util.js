import {existsSync, mkdirSync, stat, WriteStream} from "fs"
import {generateNumberBetween} from "./random-util.js"
import {once} from "events"

export async function createRandomFile(fileName) {

    let writeStream = new WriteStream(fileName);

    writeStream.on("finish", () => {
        getFileSize(fileName)
    })

    createDir("test-data")

    console.log("generating random data to file: ", fileName, ". . .")

    const generate = async () => {
        for (let i = 0; i < 7000000; i++) {
            let number = await generateNumberBetween(1, 999999999999999)
            let canWrite = writeStream.write(number.toString() + "\n")

            if (!canWrite)
                await once(writeStream, 'drain');
        }
    }

    await generate()

    console.log("generating completed!");
    console.log("file writing. . .")

    writeStream.end();
}

function getFileSize(fileName) {
    stat(fileName, (err, stats) => {
        let size = stats.size
        console.log(`${fileName}  ${size}: bytes`)
        return size
    })
}

function createDir(dir) {
    if (!existsSync(dir)) {
        mkdirSync(dir);
    }
}