const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")
const EncodingPlugin = require("webpack-encoding-plugin")

module.exports = {
  context: path.resolve(__dirname, "./"),
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
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{ loader: "file-loader" }],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "My tree component",
      template: "./webpack.index.html",
    }),
    new CleanWebpackPlugin(),
    new FaviconsWebpackPlugin("./favicon.png"),
    new EncodingPlugin({ encoding: "UTF-8" }),
  ],
}
