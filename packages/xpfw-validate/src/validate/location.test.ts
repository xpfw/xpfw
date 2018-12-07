import { RequiredType } from "../globals"
import validateLocatione from "./location"
const validateLocation: any = validateLocatione

test(`Full Coverage for validate/number Form Validation`, (done) => {
  const numberDef = {
    mapTo: `myLocationField`,
    validate: {
      required: {type: RequiredType.Always}
    }
  }
  const validVal = [12.11, 3.11]
  validateLocation(1, numberDef).catch((e: any) => {
    expect(e).toMatchSnapshot(`invalid type and required`)
    return validateLocation(["3", "1"], numberDef)
  }).catch((e: any) => {
    expect(e).toMatchSnapshot(`wrong array contents`)
    return validateLocation({not: "anarray"}, numberDef)
  }).catch((e: any) => {
    expect(e).toMatchSnapshot(`Invalid type`)
    return validateLocation(validVal, numberDef)
  }).then((e: any) => {
    expect(e).toBe(validVal)
    done()
  })
})
