import * as MockDate from "mockdate"
import { RequiredType } from "../globals"
import validateDatee from "./date"
const validateDate: any = validateDatee

test(`Full Coverage for validate/checkbox Form Validation`, (done) => {
  MockDate.set(new Date(280, 2, 5))
  const dateDef = {
    validate: true
  }
  validateDate(5, dateDef).catch((e: any) => {
    expect(e).toMatchSnapshot(`Invalid type`)
    return validateDate(false, {validate: {required: {type: RequiredType.Always}}})
  }).catch((e: any) => {
    expect(e).toMatchSnapshot(`Required but invalid`)
    return validateDate(new Date(), {validate: {required: {type: RequiredType.Always}}})
  }).then((e: any) => {
    expect(e).toMatchSnapshot(`Required and ok`)
    return validateDate(`4202-11-21`, {validate: {required: {type: RequiredType.Always}}})
  }).then((e) => {
    expect(e).toMatchSnapshot(`Required and ok because was parsable`)
    return validateDate(`29-2444-12223`, {validate: {required: {type: RequiredType.Always}}})
  }).catch((e: any) => {
    expect(e).toMatchSnapshot(`Required and not ok because`)
    MockDate.reset()
    done()
  })
})
