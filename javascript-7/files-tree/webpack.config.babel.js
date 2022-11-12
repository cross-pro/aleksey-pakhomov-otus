const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {

  mode: "development",
  entry: {
    main: "./main.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".jsx", ".png", ".jpg", ".mjs"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin(),
  ],
}
