import { readdirSync } from "fs"
import { exec } from "shelljs"
import { resolve } from "path"
const packages = ["test-util","form","permission","router","dm","data","form-web","form-bulma","form-tests","feathers-hooks","data-nedb","data-feathers","data-tests","data-bulma","dm-shared"]
const makeUpdates = async function() {
  console.log("Building " + packages.length + " Packages")
  for (const subPackage of packages) {
    console.log(`Building ${subPackage}`)
    exec(`npm run build`, {cwd: resolve(`packages/${subPackage}`)})
  }
  console.log("Successfully built packages")
}
makeUpdates()