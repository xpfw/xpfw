import { readdirSync } from "fs"
import { exec } from "shelljs"
import { resolve } from "path";
const makeUpdates = async function() {
  const subPackages = readdirSync("packages")
  console.log("Building " + subPackages.length + " Packages")
  for (const subPackage of subPackages) {
    console.log(`Building ${subPackage}`)
    exec(`npm run build`, {cwd: resolve(`packages/${subPackage}`)})
  }
  console.log("Successfully built packages")
}
makeUpdates()