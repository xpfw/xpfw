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
    "body-parser",
    "@feathersjs/feathers",
    "@feathersjs/authentication",
    "feathers-hooks",
    "feathers-memory",
    "feathers-mongodb",
    "@feathersjs/express/rest",
    "@feathersjs/errors/handler",
    "@feathersjs/express",
    "@feathersjs/socketio",
    "@feathersjs/authentication-local",
    "@feathersjs/authentication-jwt",
    "mongodb",
    "@xpfw/validate",
    "http"
  ]
};