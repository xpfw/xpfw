import { RequiredType } from "../globals"
import validateNumbere from "./number"
const validateNumber: any = validateNumbere

test(`Full Coverage for validate/number Form Validation`, (done) => {
  const numberDef = {
    mapTo: `myNumberField`,
    validate: {
      required: {type: RequiredType.Always},
      min: 2,
      max: 4
    }
  }
  const three = `3`
  validateNumber(1, numberDef).catch((e: any) => {
    expect(e).toMatchSnapshot(`Number too low`)
    return validateNumber(5, numberDef)
  }).catch((e: any) => {
    expect(e).toMatchSnapshot(`Number too high`)
    return validateNumber(`adfsg`, numberDef)
  }).catch((e: any) => {
    expect(e).toMatchSnapshot(`Invalid type`)
    return validateNumber(three, numberDef)
  }).then((e: any) => {
    expect(e).toBe(3)
    done()
  })
})
