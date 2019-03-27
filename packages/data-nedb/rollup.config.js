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
    "@feathersjs/feathers",
    "@feathersjs/authentication-client",
    "@feathersjs/socketio-client",
    "@feathersjs/rest-client",
    "resub",
    "resub-persist",
    "socket.io-client",
    "@xpfw/validate",
    "@xpfw/form-shared",
    "@xpfw/ui-shared",
    "@xpfw/ui-tests",
    "@xpfw/test-util",
    "react",
    "react-dom",
    "isomorphic-fetch",
    "nedb"
  ]
};