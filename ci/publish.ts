import { readdirSync } from "fs"
import { exec } from "shelljs"
import { resolve } from "path";
const makeUpdates = async function() {
  const subPackages = readdirSync("packages")
  console.log("Updating " + subPackages.length + " Packages in parallel")
  for (const subPackage of subPackages) {
    console.log(`Updating ${subPackage}`)
    exec(`npm run build`, {cwd: resolve(`packages/${subPackage}`)})
    exec(`npm publish`, {cwd: resolve(`packages/${subPackage}`)})
  }
  console.log("Successfully updated versions of said packages")
}
makeUpdates()