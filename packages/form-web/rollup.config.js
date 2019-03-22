// rollup.config.js
import typescript from "rollup-plugin-typescript2"
import uglify from "rollup-plugin-uglify"
import { minify } from "uglify-es"

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  },
  plugins: [
    typescript(),
    // uglify({}, minify)
  ],
  external: [
    "ajv",
    "lodash",
    "lodash-es",
    "mobx",
    "react",
    "react-dom",
    "preact-render-to-json",
    "moment",
    "mockdate",
    "@xpfw/form",
    "@xpfw/form-tests",
    "mobx-react-lite"
  ]
};