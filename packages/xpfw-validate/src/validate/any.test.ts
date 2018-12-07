import * as MockDate from "mockdate"
import { ErrorType, FieldType } from "../globals"
import ValReg from "../registry"
import validateAnyE from "./any"

MockDate.set(new Date(2241, 3, 5))

const validateAny: any = validateAnyE
const customFieldType = "myCustomFieldForValidation"
ValReg.registerValidator(customFieldType, (value) => {
  return value === -1 ? Promise.resolve(value) :
    Promise.reject([{type: ErrorType.invalidType, mapTo: `constantlywrong`}])
})
test(`Full Coverage for validate/checkbox Form Validation`, (done) => {
  const validateWithCustom: any = {
    type: FieldType.Text,
    validate: {}
  }

  validateAny().then((validationRes: any) => { // Nothing to validate so true
    expect(validationRes).toMatchSnapshot("result of empty")
    return validateAny(null, {validate: {}, type: `invalid`})
  }).catch((e: any) => {
    expect(e).toMatchSnapshot(`validate unkown string type`)
    return validateAny(null, {validate: {}, type: false})
  }).catch((e: any) => {
    expect(e).toMatchSnapshot(`validate invalid boolean type`)
    return validateAny(null, {validate: {}, type: -1})
  }).catch((e: any) => {
    expect(e).toMatchSnapshot(`validate unkown number type`)
    validateWithCustom.validate.custom = () => {
      return Promise.resolve(`RESOLVEDVAL`)
    }
    return validateAny(32, validateWithCustom)
  }).catch((e: any) => {
    expect(e).toMatchSnapshot(`validate catched but custom ok`)
    return validateAny(`a`, validateWithCustom)
  }).then((e: any) => {
    expect(e).toMatchSnapshot(`custom and real validate ok`)
    validateWithCustom.validate.custom = () => {
      return Promise.reject([{text: `customreject`}])
    }
    return validateAny(`asdf`, validateWithCustom)
  }).catch((e: any) => {
    expect(e).toMatchSnapshot(`validate and custom not ok`)
    return validateAny(342,  {type: FieldType.Number, validate: {}})
  }).then((res: any) => {
    expect(res).toMatchSnapshot("Successfully validated any number")
    return validateAny(true,  {type: FieldType.Boolean, validate: {}})
  }).then((res: any) => {
    expect(res).toMatchSnapshot("Successfully validated any boolean")
    return validateAny(new Date(),  {type: FieldType.Date, validate: {}})
  }).then((res: any) => {
    expect(res).toMatchSnapshot("Successfully validated any date")
    return validateAny(["another", "string", "array"],  {type: FieldType.Array, validate: {type: FieldType.Text}})
  }).then((res: any) => {
    expect(res).toMatchSnapshot("Successfully validated any string array")
    return validateAny({my: true},  {type: FieldType.Object, validate: {
      objectDef: [{type: FieldType.Boolean, mapTo: "my"}]
    }})
  }).then((res: any) => {
    expect(res).toMatchSnapshot("Successfully validated any object")
    return validateAny(-1, {type: customFieldType, validate: {}})
  }).catch((res: any) => {
    expect(res).toMatchSnapshot("threw custom Field unkown error because no registry passed in params")
    return validateAny(-1, {type: customFieldType, validate: {}}, {registry: ValReg})
  }).then((res: any) => {
    expect(res).toMatchSnapshot("successfully validated custom Field")
    return validateAny(1, {type: customFieldType, validate: {}})
  }).catch((res: any) => {
    expect(res).toMatchSnapshot("successfully threw custom Field error")
    return validateAny(4,  {
      type: FieldType.Select, validate: {},
      selectOptions: [
        {label: "c", value: 4},
        {label: "a", value: 2}
      ]
    })
  }).then((res: any) => {
    expect(res).toMatchSnapshot("Successfully validated any select")
    return validateAny([1.3, 5.4],  {
      type: FieldType.Location, validate: {}
    })
  }).then((res: any) => {
    expect(res).toMatchSnapshot("Successfully validated any location")
    done()
  })
})
