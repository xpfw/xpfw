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
    "@xpfw/form",
    "@xpfw/dm",
    "@xpfw/permission",
    "@feathersjs/feathers",
    "@feathersjs/errors",
    "feathers-memory",
    "feathers-mongodb",
    "mongodb"
  ]
};