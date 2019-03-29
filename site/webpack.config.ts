import * as path from "path"
import * as webpack from "webpack"

const webpackConfig: webpack.Configuration = {
  entry: `./src/index.tsx`,
  mode: "development",
  output: {
    filename: `isoapp.js`,
    chunkFilename: "[name].chunk.js",
    path: path.resolve(__dirname, "webpackDist")
  },
  plugins: [
  ],
  module: {
    rules: [ {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: `file-loader`
      }, {
        test: /\.(scss|sass)$/i,
        use: [
          {
            loader: `style-loader`
          }, {
            loader: `css-loader`
          }, {
            loader: `sass-loader`
          }
        ]
      }, {
        test: /\.(css)$/i,
        use: [
          {
            loader: `style-loader`
          }, {
            loader: `css-loader`
          }
        ]
      }, {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "@xpfw/router": path.resolve(__dirname, `./node_modules/@xpfw/router`),
      "@xpfw/validate": path.resolve(__dirname, `./node_modules/@xpfw/validate`),
      "@xpfw/form-shared": path.resolve(__dirname, `./node_modules/@xpfw/form-shared`),
      "@xpfw/ui-shared": path.resolve(__dirname, `./node_modules/@xpfw/ui-shared`)
    }
  }
}

export default webpackConfig
