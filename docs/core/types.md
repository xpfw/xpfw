# Validation Types

In case you want to validate a custom type you can register a validator for a type. With that you can also overwrite existing checks, if needed.

Call `ValidationRegistry.registerType` with the type name and a check function like this

```typescript
import { ValidationRegistry } from "@xpfw/validate"

ValidationRegistry.registerValidator("mustBe-1", (value) => {
  return value === -1 ? Promise.resolve(value) :
    Promise.reject([{type: ErrorType.invalidType, mapTo: `constantlywrong`}])
})
```

After that any `IField` with your new type will be checked against your new validation function.

To replace an existing validator use the correct `type` argument.
Here we replace the number validation to only accept numbers that are dividable by three.

```typescript
import { ValidationRegistry, FieldType } from "@xpfw/validate"
ValidationRegistry.registerValidator(FieldType.Number, (value) => {
  return value % 3 ? Promise.resolve(value) :
    Promise.reject([{type: ErrorType.invalidType, mapTo: `constantlywrong`}])
})
```