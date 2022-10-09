import { createRandomFile } from "./util/file-util.js"

let randomFile = "./test-data/random-file.txt"

async function run(randomFile) {
    await createRandomFile(randomFile)
}

run(randomFile)