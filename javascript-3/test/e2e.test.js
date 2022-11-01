import {test, expect} from "vitest"
import puppeteer from "puppeteer"
import http from "http"
import {readFile} from "fs/promises"

async function startServer() {

    const html = await readFile("./test-data/index.html", {encoding:"utf-8"})

    http.createServer(function (req, res) {
        res.write(html);
        res.end();
    }).listen(8080);

}

/*сохранить как пример*/
test("test e2e", async ()=>{
    await startServer()

    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()
    await page.goto("http://localhost:8080")

    const button = await page.$("#btn")
    expect(button).toBeDefined()

    let text = await page.evaluate((btn)=>btn.value, button )
    console.log(text)

    expect(text).toBe("0")
    await button.click()

    text = await page.evaluate((btn)=>btn.value, button )
    console.log(text)
    expect(text).toBe("1")

    await browser.close()

})