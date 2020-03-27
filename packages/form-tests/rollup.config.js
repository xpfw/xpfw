// rollup.config.js
import typescript from "rollup-plugin-typescript2"

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  },
  plugins: [
    typescript()
  ],
  external: [
    "ajv",
    "lodash",
    "lodash-es",
    "mobx",
    "react",
    "react-dom",
    "moment",
    "mockdate",
    "preact-render-to-json",
    "react-test-renderer",
    "@xpfw/form"
  ]
};