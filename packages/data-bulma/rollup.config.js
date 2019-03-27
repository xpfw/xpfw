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
    "resub",
    "resub-persist",
    "socket.io-client",
    "@xpfw/form",
    "@xpfw/data",
    "@xpfw/form-web",
    "@xpfw/form-bulma",
    "react",
    "react-dom",
    "mobx",
    "mobx-react-lite"
  ]
};