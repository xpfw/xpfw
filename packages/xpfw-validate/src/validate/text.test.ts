import { set } from "lodash"
import { FieldType, RequiredType } from "../globals"
import validateTextE from "./text"

const textField = {
  type: FieldType.Text,
  mapTo: `myStringUser`,
  validate: {
    min: 3,
    max: 23,
    required: {type: RequiredType.Always}
  }
}
const matchModel = `a`
const matchObj = {}
set(matchObj, matchModel, `c`)
const matchOpts: any = {
  type: FieldType.Text,
  mapTo: `pw2`,
  validate: {
    match: [matchModel]
  }
}
const validateText: any = validateTextE

const textValidationTest = async (done: () => void) => {
  try {
    await validateText(`a`, textField)
  } catch (e) {
    expect(e).toMatchSnapshot(`text too short`)
  }
  try {
    await validateText(true, textField)
  } catch (e) {
    expect(e).toMatchSnapshot(`invalid text type`)
  }
  try {
    await validateText("gfsdhjkglfsdhkjhafgweiurfhgadsgfsdhgdfsiuf", textField)
  } catch (e) {
    expect(e).toMatchSnapshot(`text too long`)
  }
  try {
    await validateText(`b`, matchOpts, {formData: matchObj})
  } catch (e) {
    expect(e).toMatchSnapshot(`mismatch errors`)
  }
  expect(await validateText(`c`, matchOpts, {formData: matchObj}))
  .toMatchSnapshot("result of successfull matchOpts validation")
  expect(await validateText(`mywayondahighway!`, textField))
  .toMatchSnapshot("result of successfull textField validation")
  done()
}

test(`Full Coverage for validate/text Form Validation`, (done) => {
  textValidationTest(done)
})
