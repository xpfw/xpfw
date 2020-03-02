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
    "lodash",
    "moment",
    "feathers-client",
    "mobx",
    "mobx-react",
    "socket.io-client",
    "@xpfw/form",
    "react",
    "react-dom"
  ]
};