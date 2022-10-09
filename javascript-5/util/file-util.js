import { createWriteStream, stat } from "fs"
import { generateNumberBetween } from "./random-util.js"

export async function createRandomFile(fileName) {
    let writeStream = new createWriteStream(fileName)

    writeStream.on("finish", () => {
        getFileSize(fileName)
    })

    console.log("generating random data to file: ", fileName, ". . .")

    const generate = async() => {
        for (let i = 0; i < 7000000; i++) {
            let number = await generateNumberBetween(1, 999999999999999)
            writeStream.write(number.toString() + "\n")
        }
    }

    await generate()

    console.log("generating completed!");
    console.log("file writing. . .")

    writeStream.end();
}

export async function getFileSize(fileName) {
    stat(fileName, (err, stats) => {
        let size = stats.size
        console.log("file size: ", size, " bytes")
        return size
    })
}