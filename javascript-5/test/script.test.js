import { test, expect } from "vitest"
import { doScript } from "../script.js"


test("separate file", async() => {
    expect(await doScript()).toBe(1);
})