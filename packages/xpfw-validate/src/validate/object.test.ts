import { FieldType, RequiredType } from "../globals"
import validateArraye from "./array"
import validateObjecte from "./object"

const validateArray: any = validateArraye
const validateObject: any = validateObjecte

test(`Full Coverage for validate/object Form Validation`, (done) => {
  const subField1 = {
    mapTo: `waddup`,
    type: FieldType.Text,
    validate: {}
  }
  const subField2 = {
    mapTo: `second`,
    type: FieldType.Number,
    validate: {}
  }
  const nestedObject = {
    mapTo: `nested`,
    type: FieldType.Object,
    validate: {objectDef: [subField2]}
  }
  const fullObjectValidation = {
    mapTo: `valobj`,
    type: FieldType.Object,
    validate: {
      objectDef: [subField1, subField2, nestedObject]
    }
  }
  const objectWrappedInArrayValidation = {
    mapTo: `container`,
    type: FieldType.Array,
    validate: {
      type: FieldType.Object,
      validate: fullObjectValidation.validate
    }
  }
  validateObject(null, {validate: {required: {type: RequiredType.Always}}}).catch((e: any) => {
    expect(e).toMatchSnapshot(`Required `)
    return validateObject({waddup: `bra`}, fullObjectValidation)
  }).then((res: any) => {
    expect(res).toMatchSnapshot(`Validated valid object`)
    return validateObject({waddup: `bra`, second: 5423, nested: {waddup: `ghfsd`, second: 6243}}, fullObjectValidation)
  }).then((res: any) => {
    expect(res).toMatchSnapshot(`Validated deeply nested object`)
    return validateArray([
      {waddup: `cool`, second: 773}, {nested: {waddup: `gasd`}}, {nested: {second: 672}}
    ], objectWrappedInArrayValidation)
  }).then((res: any) => {
    expect(res).toMatchSnapshot(`Validated array with varying nestings`)
    return validateObject({waddup: true}, fullObjectValidation)
  }).catch((res: any) => {
    expect(res).toMatchSnapshot(`Validated faulty object`)
    return validateArray([
      {waddup: `cool`, second: `hfsd`}, {nested: {waddup: false}}, {nested: {second: 672}}
    ], objectWrappedInArrayValidation)
  }).catch((res: any) => {
    expect(res).toMatchSnapshot(`Validated array with varying nestings and fault`)
    return validateObject({waddup: `bra`, second: 5423, nested: {
      waddup: `ghfsd`, second: `hjgfds`
    }}, fullObjectValidation)
  }).catch((res: any) => {
    expect(res).toMatchSnapshot(`Validated deeply nested object with fault`)
    return validateObject({waddup: `bra`, second: 5423, nested: {
      second: 5423
    }}, fullObjectValidation)
  }).then((res: any) => {
    expect(res).toMatchSnapshot(`Correctly Validated deeply nested object`)
    done()
  })
})
