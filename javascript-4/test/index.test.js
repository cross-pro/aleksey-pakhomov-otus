import { readDir } from "../index.js";
import { test, expect } from "vitest"

const testData = '{"files": ["foo/f1.txt", "foo/f2.txt", "foo/bar/bar1.txt", "foo/bar/bar2.txt"], "dirs": ["foo","foo/bar","foo/bar/baz"]}'


test("test readDir", () => {
    expect(readDir("testdata")).toBe(JSON.stringify(JSON.parse(testData), null, 1))
})