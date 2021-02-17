const modifyConf = require("./webpack.config")
const webpack = require("webpack")

modifyConf.plugins.push(new webpack.optimize.ModuleConcatenationPlugin())
modifyConf.mode = "production"

module.exports = modifyConf
