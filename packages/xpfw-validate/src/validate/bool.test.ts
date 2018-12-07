import { RequiredType } from "../globals"
import validateBoole from "./bool"

const validateBool: any = validateBoole

test(`Full Coverage for validate/checkbox Form Validation`, (done) => {
  const checkboxDef = {
    validate: {},
    mapTo: `mymapping`
  }
  validateBool(5, checkboxDef).catch((e: any) => {
    expect(e).toMatchSnapshot(`Invalid type`)
    return validateBool(false, {validate: {required: {type: RequiredType.Always}}, mapTo: `MapA`})
  }).catch((e: any) => {
    expect(e).toMatchSnapshot(`Required but false`)
    return validateBool(true, {validate: {required: {type: RequiredType.Always}, mapTo: `MapB`}})
  }).then((e: any) => {
    expect(e).toMatchSnapshot(`Required and ok`)
    done()
  })
})
