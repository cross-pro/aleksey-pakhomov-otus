import { promises } from "fs"

const path = process.env.npm_config_path;

let result = {
    files: [],
    folders: []
}

const readDir = async(dir) => {
    return await parseContent(dir, await getFolderContent(dir))
}

const concatPath = (dir, path) => {
    return dir + "/" + path
}

const getFolderContent = async(dir) => {
    return promises.readdir(dir).then((filenames) => filenames)
}

const parseContent = async(dir, content) => {
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
const getType = async(fsObject) => {
    async function getFileStat(fsObject) {
        return promises.stat(fsObject)
    }

    const getFileType = async(fsObject) => {
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

const tree = async() => {
    if (path == undefined) {
        console.error("Необходимо указать параметр --path")
        return
    }

    console.debug("using path: ", path)
    let result = await readDir(path)
    console.log(result)
}

export { readDir, tree }