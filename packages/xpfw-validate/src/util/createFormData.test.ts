import { FieldType } from "../globals"
import createFormData from "./createFormData"

it("Expect createFormData behaves consistently", () => {
    const dataDef = [
        {field: {type: FieldType.Text, mapTo: `asd`}, value: `dhgf`},
        {field: {type: FieldType.Number, mapTo: `val`, model: `numberAlt`}, value: 4201},
        {field: {type: FieldType.Number, mapTo: `truebool`}, value: true},
        {field: {type: FieldType.Number, mapTo: `bool`, model: `moreAlt`}, value: false},
        {field: {type: FieldType.Number, mapTo: `decimal`}, value: 7.321},
        {field: {type: FieldType.Number, mapTo: `obj`}, value: {this: `is`, areal: `obj`}},
        {field: {type: FieldType.Number, mapTo: `string array`}, value: [`rra`, `with`, `content`]},
        {field: {type: FieldType.Number, mapTo: `number array`, model: `alt`}, value: [4, 2, 1, 0, 4, 5, 2, 1]}
    ]
    expect(createFormData(dataDef)).toMatchSnapshot("Full Type Object")
    expect(createFormData(dataDef, {mapTo: "model"})).toMatchSnapshot("NotUsing Mapto")
})
