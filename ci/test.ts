import { readdirSync } from "fs"
import { exec } from "shelljs"
import { resolve } from "path";
const makeUpdates = async function() {
  const subPackages = readdirSync("packages")
  console.log("Testing " + subPackages.length + " Packages")
  const failed = []
  for (const subPackage of subPackages) {
    console.log(`Testing ${subPackage}`)
    const res: any = exec(`jest -u --forceExit .`, {cwd: resolve(`packages/${subPackage}`)})
    console.log(`result for subpackage is `, res)
    if (res.code !== 0) {
      failed.push(subPackage)
    }
  }
  console.log("Done testing following packages failed", failed)
}
makeUpdates()