import {test, expect} from "vitest"
import {getPath} from "../index.js"
import {readFile} from "fs/promises"
import {JSDOM} from "jsdom"


test("test load", async () => {
    const file = await readFile("./test-data/index.html", {encoding: "utf-8"})

    const jsDom = new JSDOM(file, {runScripts: "dangerously"})

    const button = await jsDom.window.document.getElementById("btn")
    console.log(button)
    console.log(button.getAttribute("class"))
    console.log(button.value)

    expect(button.value).toBe("0")
    button.click()
    expect(button.value).toBe("1")

})

test("test of null", async () => {
    expect(await getPath(null)).toBe(null)
})

test("test of undefined", async () => {
    expect(await getPath(undefined)).toBe(null)
})

test("test getPath for id with puppeteer", async () => {

    const file = await readFile("./test-data/index.html", {encoding: "utf-8"})
    const jsDom = new JSDOM(file, {runScripts: "dangerously"})

    const button = await jsDom.window.document.getElementById("btn")
    let expected = "#btn"

    console.log(button)

    let actual = await getPath(button)
    console.log("actual:", actual)
    expect(actual).toBe(expected)
})


/*проверяет
* 1. переданный селектор соответствует найденному
* 2. элемент равен елементу
* 3. querySelectorAll возвращает нужный элемент и он один*/
function testWrapper(description, selector) {
    test(description, async () => {
        const expected = selector
        const file = await readFile("./test-data/index.html", {encoding: "utf-8"})
        const jsDom = new JSDOM(file, {runScripts: "dangerously"})
        const element = await jsDom.window.document.querySelector(expected)

        const actual = await getPath(element)

        expect(actual).toBe(expected)
        let newElement = await jsDom.window.document.querySelector(actual)
        expect(newElement).toBe(element)

        let elementAll = await jsDom.window.document.querySelectorAll(actual)
        expect(elementAll.length).toBe(1)
        expect(elementAll[0]).toBe(element)
    })
}

testWrapper("test for id by selector", "#btn")
testWrapper("test first element", "#header > p")
testWrapper("test several class element", "#main > p.line.first")
testWrapper("test div", "#main > div:nth-child(3)")
testWrapper("test firth p", "#main > p:nth-child(5)")
testWrapper("test p.unique","#main > p.unique")
testWrapper("test p seventh","#main > p:nth-child(7)")
testWrapper("test #btn","#btn")
testWrapper("test eighth p","#main > p:nth-child(8)")
testWrapper("test main div","#main")
testWrapper("test first div","#main > div:nth-child(1)")
