export async function getPath(element) {
    if (element === null || element === undefined)
        return null

    console.log("parsed element:", element)

    const uniqueId = getId(element)
    if (uniqueId != null)
        return uniqueId

    let result = ""

    const path = []

    let actualElement = element

    do {
        actualElement = parseElement(actualElement, path)
    } while (actualElement != null)


    path.reverse().map(p => {
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

    path.push(result)

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
        return elementClass
    } else
        return null
}



