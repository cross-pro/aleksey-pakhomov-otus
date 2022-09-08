import { opendir } from 'fs/promises';

const PATH = process.env.npm_config_path;

let result = {
    files: [],
    folders: []
}

const readDir = async(directory) => {
    console.log(directory)
    try {
        const dir = await opendir(directory);
        for await (const dirent of dir) {
            let fsObject = concatPath(directory, dirent.name)

            if (dirent.isDirectory()) {
                result.folders.push(fsObject)
                await readDir(fsObject)
            } else if (dirent.isFile()) {
                result.files.push(fsObject)
            }
        }
        return result
    } catch (err) {
        console.error(err);
    }
}

const concatPath = (dir, path) => {
    return dir + "/" + path
}

const tree = async() => {
    if (PATH == undefined) {
        console.error("Необходимо указать параметр --path")
        return
    }

    console.debug("using path: ", PATH)
    let result = await readDir(PATH)
    console.log(result)
}

export { readDir, tree }