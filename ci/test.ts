import { readdirSync } from "fs"
import { exec } from "shelljs"
import { resolve } from "path";
import console = require("console");
const makeUpdates = async function() {
  const subPackages = readdirSync("packages")
  console.log("Testing " + subPackages.length + " Packages")
  const failed = []
  for (const subPackage of subPackages) {
    if (subPackage !== "xpfw-form-native" && subPackage !== "xpfw-ui-native") {
      console.log(`Testing ${subPackage}`)
      const res: any = exec(`${__dirname}/../node_modules/.bin/jest --forceExit`, {cwd: resolve(`packages/${subPackage}`),env:{TZ: "Europe/Amsterdam"}})
      console.log(`result for subpackage is `, res)
      if (res.code !== 0) {
        failed.push(subPackage)
      }
    }
  }
  console.log("Done testing following packages failed", failed)
  if (failed.length > 0) {
    console.log("Exiting with non zero status because of the failed packages")
    process.exit(-1)
  }
}
makeUpdates()