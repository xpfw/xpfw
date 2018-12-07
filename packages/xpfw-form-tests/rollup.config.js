// rollup.config.js
import typescript from "rollup-plugin-typescript2"
import {uglify} from "rollup-plugin-uglify"
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
    "lodash",
    "moment",
    "mockdate",
    "feathers-client",
    "resub",
    "resub-persist",
    "socket.io-client",
    "@xpfw/validate",
    "@xpfw/form-shared",
    "react",
    "react-dom",
    "preact-render-to-json"
  ]
};