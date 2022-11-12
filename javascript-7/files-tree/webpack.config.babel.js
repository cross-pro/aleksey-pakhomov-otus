const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")
const EncodingPlugin = require("webpack-encoding-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserWebPackPlugin = require("terser-webpack-plugin")
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")

const isDev = process.env.NODE_ENV === "development"
const isProd = !isDev

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  }

  if (isProd) {
    config.minimizer = [
      new TerserWebPackPlugin(),
      new CssMinimizerWebpackPlugin(),
    ]
  }

  return config
}

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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
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
  optimization: optimization(),
  plugins: [
    new HTMLWebpackPlugin({
      title: "My tree component",
      template: "./webpack.index.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new FaviconsWebpackPlugin("./favicon.png"),
    new EncodingPlugin({ encoding: "UTF-8" }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  devServer: {
    port: 4200,
  },
}
