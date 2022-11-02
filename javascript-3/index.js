import {parseElement, buildSelector, getId} from "./selector-util.js"

export async function getPath(element) {
    if (element === null || element === undefined)
        return null

    console.log("parsed element:", element)

    const uniqueId = getId(element)
    if (uniqueId != null)
        return uniqueId

    const path = []

    let actualElement = element

    do {
        actualElement = parseElement(actualElement, path)
        //если есть id выше искать смысла нет
        if (buildSelector(path).substring(0, 1) === "#") {
            break
        }
    } while (actualElement != null)

    return buildSelector(path)
}
