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
    "react-dom",
    "preact-render-to-json",
    "moment",
    "mockdate",
    "@xpfw/form",
    "moment",
    "@feathersjs/feathers",
    "@feathersjs/socketio-client",
    "@feathersjs/rest-client",
    "resub",
    "resub-persist",
    "socket.io-client",
    "@xpfw/validate",
    "@xpfw/ui-tests",
    "@xpfw/ui-feathers",
    "@xpfw/data-tests",
    "@xpfw/data-feathers",
    "@xpfw/test-util",
    "react",
    "react-dom",
    "isomorphic-fetch",
    "fast-json-patch"
  ]
};