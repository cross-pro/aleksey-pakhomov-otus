import { readDir } from "../index.js";
import { test, expect } from "vitest"

const testData = '{"files": ["foo/f1.txt", "foo/f2.txt", "foo/bar/bar1.txt", "foo/bar/bar2.txt"], "dirs": ["foo","foo/bar","foo/bar/baz"]}'

let expectedData = {
    files: [
        "test/testdata/foo/bar/bar1.txt",
        "test/testdata/foo/bar/bar2.txt",
        "test/testdata/foo/f1.txt",
        "test/testdata/foo/f2.txt"
    ],
    folders: [
        "test/testdata/foo",
        "test/testdata/foo/bar",
        "test/testdata/foo/bar/baz"
    ]
}

test("test readDir", async() => {
    async function getResult() {
        let result = await readDir("test/testdata")
        console.log(result)
        return result
    }
    expect(JSON.stringify(await getResult())).toBe(JSON.stringify(expectedData))
})