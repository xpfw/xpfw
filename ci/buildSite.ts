import { exec, cp, rm } from "shelljs"
import { resolve } from "path"

rm("-rf", resolve(`site/webpackDist/`))
rm("-rf", resolve(`docs/_book`))
exec("npm run build", {cwd: resolve(`site`)})
exec("npm run buildPre", {cwd: resolve(`site`)})
exec("npm run preRender", {cwd: resolve(`site`)})
exec("gitbook build", {cwd: resolve(`docs`)})
cp("-r", resolve(`docs/_book/`), resolve(`site/webpackDist/docs/`))