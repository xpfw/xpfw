import * as path from "path"
import * as webpack from "webpack"
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const nodeModules: any = {}
// fs.readdirSync(path.resolve(__dirname, "../isofw-node/node_modules"))
// .filter((x) => {
//   return ".bin".indexOf(x) === -1
// })
// .forEach((mod: any) => {
//   nodeModules[mod] = "commonjs " + mod
// })

const webpackServerConfig: webpack.Configuration = {
  target: "node" as "node",
  mode: "development",
  externals: [nodeModules],
  entry: "./src/prerender.tsx",
  output: {
    filename: `prerender.js`,
    chunkFilename: "[name].chunk.js",
    path: path.resolve("webpackDist")
  },
  plugins: [
    new MiniCssExtractPlugin("style.css")
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: `babel-loader`
          }
        ]
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: `file-loader`
      }, {
        test: /\.(scss|sass)$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }, {
        test: /\.(css)$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }, {
        test: /\.tsx?$/,
        exclude: /.*(node_modules).*/,
        loader: "awesome-typescript-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "@xpfw/router": path.resolve(__dirname, `./node_modules/@xpfw/router`),
      "@xpfw/validate": path.resolve(__dirname, `./node_modules/@xpfw/validate`),
      "@xpfw/form": path.resolve(__dirname, `./node_modules/@xpfw/form`),
      "@xpfw/data": path.resolve(__dirname, `./node_modules/@xpfw/data`)
    }
  }
}

export default webpackServerConfig


