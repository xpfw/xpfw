import { FieldType, RequiredType } from "../globals"
import { IFieldSelect } from "../typeDef"
import validateListSelecte from "./select"
const validateListSelect: any = validateListSelecte

const selField: IFieldSelect = {
  type: FieldType.Select,
  mapTo: `mySelField`,
  selectOptions: [
    {label: "c", value: 4},
    {label: "a", value: 2}
  ],
  validate: {required: {type: RequiredType.Always}}
}
const selFieldString: IFieldSelect = {
  type: FieldType.Select,
  mapTo: `mySelField`,
  selectOptions: [
    {label: "f", value: "i"},
    {label: "q", value: "h"},
    {label: "d", value: "ö"}
  ],
  validate: {required: {type: RequiredType.Always}}
}
const selFieldWithFunc: IFieldSelect = {
  type: FieldType.Select,
  mapTo: `mySelField`,
  selectOptions: () => [
    {label: "c", value: 4},
    {label: "a", value: 2}
  ],
  validate: {required: {type:  RequiredType.Always}}
}

test(`Full coverage for listselect`, (done) => {
  validateListSelect(``, selField).catch((e: any) => {
    expect(e).toMatchSnapshot(`errors for empty string`)
    return validateListSelect(-1, selField)
  }).catch((e: any) => {
    expect(e).toMatchSnapshot(`errors for -1 number`)
    return validateListSelect(6, selField)
  }).catch((e: any) => {
    expect(e).toMatchSnapshot(`errors for mismatch correct number 6`)
    return validateListSelect(4, selField)
  }).then((e: any) => {
    expect(e).toMatchSnapshot(`result for correctly matched select`)
    return validateListSelect(6, selFieldWithFunc)
  }).catch((e: any) => {
    expect(e).toMatchSnapshot(`errors for mismatch correct number 6 as func`)
    return validateListSelect(4, selFieldWithFunc)
  }).then((e: any) => {
    expect(e).toMatchSnapshot(`result for correctly matched select as func`)
    return validateListSelect("ö", selFieldString)
  }).then((e: any) => {
    expect(e).toMatchSnapshot(`result for string match`)
    return validateListSelect("vv", selFieldString)
  }).catch((e: any) => {
    expect(e).toMatchSnapshot(`result for wromg string match`)
    done()
  })
})
