import {test, expect} from "vitest"
import {getPath} from "../index.js"
import {launch} from "puppeteer"
import {readFile} from "fs/promises"
import {JSDOM} from "jsdom"


test("test load", async () => {

    const file = await readFile("./test-data/index.html", {encoding: "utf-8"})

    console.log(file)

    const jsDom = new JSDOM(file, {runScripts: "dangerously"})


    const button = jsDom.window.document.getElementById("btn")
    console.log(button.value)

    expect(button.value).toBe("Click me")
    button.click()
    expect(button.value).toBe("Click me")

})

