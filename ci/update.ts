const ncu: any = require("npm-check-updates")
import { readdirSync } from "fs"
import { resolve } from "path"
import { rm } from "shelljs"

const makeUpdates = async function() {
  const subPackages = readdirSync("packages")
  const filePaths = subPackages.map((e) => {
    return `packages/${e}`
  })
  filePaths.push(`site/package.json`)
  console.log("Updating " + subPackages.length + " Packages in parallel")
  for (const subPackage of filePaths) {
    console.log(`Updating ${subPackage}`)
    const res = await ncu.run({
      packageFile: `${subPackage}/package.json`,
      upgrade: true,
      silent: true
    })
    rm(resolve(`${subPackage}/yarn.lock`))
    console.log(`Updating ${subPackage} versions are`, res)
  }
  console.log("Successfully updated versions of said packages")
}
makeUpdates()