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
    "ajv-formats",
    "lodash",
    "mobx",
    "react",
    "react-dom"
  ]
};