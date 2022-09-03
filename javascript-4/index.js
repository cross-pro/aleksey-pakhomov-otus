import { promises } from "fs"

let result = {
    files: [],
    folders: []
}

async function readDir(dir) {
    return await parseContent(dir, await getFolderContent(dir))
}

function concatPath(dir, path) {
    return dir + "/" + path
}

async function getFolderContent(dir) {
    return promises.readdir(dir).then((filenames) => filenames)
}

async function parseContent(dir, content) {
    for (let file of content) {
        let fsObject = concatPath(dir, file)
        let type = await getType(fsObject)

        if (type === "file") {
            result.files.push(fsObject)
        } else if (type === "folder") {
            result.folders.push(fsObject)
            await parseContent(fsObject, await getFolderContent(fsObject))
        }
    }
    return result
}

/* файл или директория */
async function getType(fsObject) {
    async function getFileStat(fsObject) {
        return promises.stat(fsObject)
    }

    async function getFileType(fsObject) {
        let statistics = await getFileStat(fsObject)

        switch (statistics.mode) {
            case 16822:
                return "folder"
            case 33206:
                return "file"
        }
    }

    return getFileType(fsObject)
}

export { readDir }