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

function buildSelector(path) {
    let result = ""
    let copyArray = [...path]
    copyArray.reverse().map(p => {
        let newValue = p + " > "
        result = result + newValue
    })
    return result.slice(0, result.length - 3)
}

function parseElement(element, path) {
    console.log("parse:", element.tagName)
    if (element === null || element.tagName.toLowerCase() === "body") {
        return null
    }

    let id = getId(element)
    let className = getClass(element)
    let tag = element.tagName.toLowerCase()

    let result = ""
    if (id !== null) {
        result = id
    } else {
        if (className !== null) {
            result = tag + "." + className
        }
        else {
            result = tag
        }
    }

    let uniqueSelector = getUniqueSelector(element, result)
    path.push(uniqueSelector)

    return element.parentNode
}

function getId(element) {
    if (element.hasAttribute("id")) {
        const id = element.getAttribute("id")
        return "#" + id;
    } else {
        return null
    }
}

function getClass(element) {
    let elementClass
    if (element.hasAttribute("class")) {
        elementClass = element.getAttribute("class")
        return elementClass.replaceAll(" ", ".")
    } else
        return null
}

/*если внутри блока несколько элементов возвращает позицию*/
function getPosition(element) {
    let index = Array.from(element.parentNode.children).indexOf(element)
    return `${element.tagName.toLowerCase()}:nth-child(${parseInt(index) + 1})`
}

function getUniqueSelector(element, selector) {
    if (element.parentElement.querySelectorAll(selector).length !== 1) {
        return getPosition(element)
    } else {
        return selector
    }
}

