import { FieldType } from "../globals"
import textRegex from "./textRegex"

it("Expect createFormData behaves consistently", () => {
    expect(textRegex("myString")).toMatchSnapshot("result of to regex")
})
