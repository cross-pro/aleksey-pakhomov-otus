import { resolve } from "path"

export const entry = "./index.js"
export const output = {
  filename: "main.js",
  path: resolve("./", "dist"),
}
