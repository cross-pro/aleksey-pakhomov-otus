import { createRandomFile } from "./util/file-util.js"

let dataFile = "./test-data/random-file.txt"

;(async () => {
    await createRandomFile(dataFile)
})()