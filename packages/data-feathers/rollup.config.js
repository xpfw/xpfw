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
    "moment",
    "@feathersjs/feathers",
    "@feathersjs/authentication-client",
    "@feathersjs/socketio-client",
    "@feathersjs/rest-client",
    "resub",
    "resub-persist",
    "socket.io-client",
    "@xpfw/validate",
    "@xpfw/ui-tests",
    "@xpfw/ui-feathers",
    "@xpfw/data",
    "@xpfw/data-tests",
    "@xpfw/data-feathers",
    "@xpfw/test-util",
    "react",
    "react-dom",
    "isomorphic-fetch"
  ]
};