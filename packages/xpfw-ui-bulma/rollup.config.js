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
    "lodash",
    "moment",
    "feathers-client",
    "resub",
    "resub-persist",
    "socket.io-client",
    "@xpfw/validate",
    "@xpfw/form-shared",
    "@xpfw/ui-shared",
    "@xpfw/form-web",
    "@xpfw/form-bulma",
    "react",
    "react-dom"
  ]
};