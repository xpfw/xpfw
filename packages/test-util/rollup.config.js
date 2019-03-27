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
    "@xpfw/data",
    "http"
  ]
};