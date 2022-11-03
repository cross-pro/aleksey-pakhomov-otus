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
        } else {
            result = tag
        }
    }

    let uniqueSelector = getUniqueSelector(element, result)
    path.push(uniqueSelector)

    return element.parentNode
}

function getId(element) {
    if (element.id === "")
        return null
    else
        return "#" + element.id
}

function getClass(element) {
    if (element.className === "") {
        return null
    } else {
        return element.className.replaceAll(" ", ".")
    }
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

export { parseElement, buildSelector, getId }