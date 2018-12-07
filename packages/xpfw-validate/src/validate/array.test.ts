import { FieldType, RequiredType } from "../globals"
import validateArraye from "./array"

const validateArray: any = validateArraye

async function makeTest(done: () => void) {
  try {
    await validateArray(null, {validate: {required: {type: RequiredType.Always}}})
  } catch (e) {
    expect(e)
    .toMatchSnapshot("Required Array not Set")
  }
  expect(await validateArray(["my", "strings"], {
    validate: {required: {type: RequiredType.Always}, validate: {type: FieldType.Text}}
  })).toMatchSnapshot("successffullay validated stringarray")
  expect(validateArray(["my", "strings"], {
    validate: {max: 1, required: {type: RequiredType.Always}, validate: {type: FieldType.Text}}
  })).rejects.toMatchSnapshot("array too long")
  expect(validateArray(["my", "strings"], {
    validate: {min: 3, required: {type: RequiredType.Always}, validate: {type: FieldType.Text}}
  })).rejects.toMatchSnapshot("array too short")
  expect(validateArray(["my", "strings"], {
    validate: {min: 2, max: 3, required: {type: RequiredType.Always}, validate: {type: FieldType.Text}}
  })).resolves.toMatchSnapshot("array with length constraint ok")
  done()
}

test(`Full Coverage for validate/array Form Validation`, (done) => {
  makeTest(done)
})
