import { JSONSchemaDefinition } from "../jsonschema"
import FormStore from "../store/form"
import useArrayHelper from "./array"

describe("Form Hooks Test", () => {
  it("useArrayHelper", () => {
    const valueToSet = "myStringValue"
    let arrayHelper = useArrayHelper(valueToSet)
    expect(FormStore.formData).toMatchSnapshot("Before anything")
    arrayHelper.fields[0].increaseSize()
    expect(FormStore.formData).toMatchSnapshot("After calling increase size on subfield")
    arrayHelper.increaseSize()
    arrayHelper.increaseSize()
    expect(FormStore.formData).toMatchSnapshot("After calling increase size on root")
    arrayHelper = useArrayHelper(valueToSet)
    FormStore.setValue(arrayHelper.fields[1].mapTo, " set specific value ")
    expect(FormStore.formData).toMatchSnapshot("After Using subfield map to with set value")
    arrayHelper.fields[1].decreaseSize()
    expect(FormStore.formData).toMatchSnapshot("After Using subfield Decrease size")
    arrayHelper.decreaseSize()
    expect(FormStore.formData).toMatchSnapshot("After Using Global Decrease size")
  })
})
