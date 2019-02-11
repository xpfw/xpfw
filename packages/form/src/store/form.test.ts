import FormStore from "./form"

describe("Form Store Test", () => {
  it("getValue/setValue", () => {
    const valueToSet = "myVal"
    const valueOne = "theFirstValue"
    const valueTwo = "mySecondVal"
    FormStore.setValue(valueToSet, valueOne)
    expect(FormStore.getValue(valueToSet)).toBe(valueOne)
    expect(FormStore.getValue(valueToSet)).not.toBe(valueTwo)
    FormStore.setValue(valueToSet, valueTwo)
    expect(FormStore.getValue(valueToSet)).not.toBe(valueOne)
    expect(FormStore.getValue(valueToSet)).toBe(valueTwo)
  })
  it("getError/setError", () => {
    const valueToSet = "myVal"
    const valueOne = "theFirstValue"
    const valueTwo = "mySecondVal"
    FormStore.setError(valueToSet, valueOne)
    expect(FormStore.getError(valueToSet)).toBe(valueOne)
    expect(FormStore.getError(valueToSet)).not.toBe(valueTwo)
    FormStore.setError(valueToSet, valueTwo)
    expect(FormStore.getError(valueToSet)).not.toBe(valueOne)
    expect(FormStore.getError(valueToSet)).toBe(valueTwo)
  })
})
