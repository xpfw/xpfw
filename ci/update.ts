const ncu: any = require("npm-check-updates")
import { readdirSync } from "fs"

const makeUpdates = async function() {
  const subPackages = readdirSync("packages")
  const filePaths = subPackages.map((e) => {
    return `packages/${e}/package.json`
  })
  filePaths.push(`site/package.json`)
  console.log("Updating " + subPackages.length + " Packages in parallel")
  for (const subPackage of filePaths) {
    console.log(`Updating ${subPackage}`)
    const res = await ncu.run({
      packageFile: subPackage,
      upgrade: true,
      silent: true
    })
    console.log(`Updating ${subPackage} versions are`, res)
  }
  console.log("Successfully updated versions of said packages")
}
makeUpdates()