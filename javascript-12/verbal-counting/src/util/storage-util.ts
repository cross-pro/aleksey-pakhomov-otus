import ISettings from "../models/settings"

const save = (key: string, value: string) => {
    localStorage.setItem(key, value)
}

const load = (key: string) => {
    return localStorage.getItem(key)
}

const loadSettings = () => {
    let sum = load("sum") == null ? false : load("sum") === "T"
    let diff = load("diff") == null ? false : load("diff") === "T"
    let mult = load("mult") ==null ? false : load("mult") ==="T"
    let divide = load("divide") ==null ? false : load("divide") ==="T"
    let exp = load("exp") ==null ? false : load("exp") ==="T"
    let difficult = load("difficult") == null ? 5 : parseInt(load("difficult"))
    let time = load("time") == null ? 5 : parseInt(load("time"))

    let settings: ISettings = {
        sum: sum,
        diff: diff,
        mult: mult,
        divide: divide,
        exp: exp,
        difficult: difficult,
        time: time
    }

    return settings
}


export { loadSettings, save }