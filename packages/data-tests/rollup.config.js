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
    "isomorphic-fetch",
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
    "@xpfw/form-shared",
    "@xpfw/ui-shared",
    "moment",
    "@feathersjs/feathers",
    "@feathersjs/authentication-client",
    "@feathersjs/socketio-client",
    "@feathersjs/rest-client",
    "resub",
    "resub-persist",
    "socket.io-client",
    "@xpfw/validate",
    "@xpfw/form-shared",
    "@xpfw/ui-tests",
    "@xpfw/ui-feathers",
    "@xpfw/data",
    "@xpfw/data-tests",
    "@xpfw/data-feathers",
    "@xpfw/test-util",
    "react",
    "react-dom",
    "react-test-renderer",
    "isomorphic-fetch"
  ]
};