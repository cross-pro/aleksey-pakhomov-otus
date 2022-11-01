const testFile = "./test-data/index.html"

async function getPath(element) {
    if (element === null || element === undefined)
        return null

    console.log("parsed element:", element)

    if (element.hasAttribute("id")) {
        console.log("element has an id")
        const id = element.getAttribute("id")
        return "#" + id;
    }

    const path = []
    const elementTag = element.tagName
    let elementClass

    if (element.hasAttribute("class"))
        elementClass = element.getAttribute("class")


    return data
}


export {getPath}

