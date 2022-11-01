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

test("test of null", async ()=>{
    expect(await getPath(null)).toBe(null)
})

test("test of undefined", async ()=>{
    expect(await getPath(undefined)).toBe(null)
})

test("test getPath for id with puppeteer", async()=>{

    const file = await readFile("./test-data/index.html", {encoding: "utf-8"})
    const jsDom = new JSDOM(file, {runScripts: "dangerously"})

    const button = await jsDom.window.document.getElementById("btn")
    let expected = "#btn"

    console.log(button)

    let actual = await getPath(button)
    console.log("actual:", actual)
    expect(actual).toBe(expected)

})

test("test first element", async ()=>{
    const expected = "#header > p"

    const file = await readFile("./test-data/index.html", {encoding: "utf-8"})
    const jsDom = new JSDOM(file, {runScripts: "dangerously"})

    const element = await jsDom.window.document.querySelector(expected)
    console.log(element.tagName)

    const actual = await getPath(element)

    expect(actual).toBe(expected)


})