import { test, expect } from "vitest"
import { findElement } from "../src/data-util"

test("findElement test", () => {
  const collection = [
    {
      id: 1,
      name: "Name1",
    },
    {
      id: 2,
      name: "Name2",
    },
  ]

  let result = findElement("id", 1, collection)
  expect(JSON.stringify(result)).toBe("{\"id\":1,\"name\":\"Name1\"}")

  result = findElement("id", 3, collection)
  expect(result).toBe(undefined)
})
