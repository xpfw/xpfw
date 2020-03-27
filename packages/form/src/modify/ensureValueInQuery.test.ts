import ensureValueInQuery from "./ensureValueInQuery"

describe("PermissionRegistry Test", () => {
  it("get and register permission", () => {
    const path = "belongsTo"
    const userid = " my userid "
    expect(ensureValueInQuery({}, path, userid)).toMatchSnapshot(" inserted into empty object ")
    expect(ensureValueInQuery({
      $or: [{belongsTo: " another person's user ID "}, {}]
    }, path, userid)).toMatchSnapshot(" inserted into $or object ")
    expect(ensureValueInQuery({
      $and: [{}, {}]
    }, path, userid)).toMatchSnapshot(" inserted into $or object ")
  })
})
