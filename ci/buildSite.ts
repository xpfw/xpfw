import { exec, cp, rm } from "shelljs"
import { resolve } from "path"

rm("-rf", resolve(`site/webpackDist/`))
rm("-rf", resolve(`docs/_book`))
exec("npm run static", {cwd: resolve(`site`)})
exec("gitbook build", {cwd: resolve(`docs`)})
cp("-r", resolve(`docs/_book/`), resolve(`site/webpackDist/docs/`))