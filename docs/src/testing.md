# Testing

*xpfw* delivers premade tests which you can include to get increase code coverage out of your custom styled components!

All tests follow the same "API". It is an exported function, which you give your readily usable React Component. That will be rendered then.

# Form Tests
For tests regarding form component themes there is [@xpfw/form-tests](https://github.com/xpfw/xpfw/tree/master/packages/form-tests)
It contains the following tests:
- booleanTest
- stringTest
- arrayTest
- dateTest
- locationTest
- objectTest
- selectTest

# Data Tests
For tests regarding data / CRUD components there is [@xpfw/data-tests](https://github.com/xpfw/xpfw/tree/master/packages/data-tests)
It provides the following tests:
- authTest
- createTest
- editTest
- removeTest
- showTest
- listTest
- relationshipTest

> # Caution! MongoDB required
>
> A running MongoDB instance on localhost is required to run the data tests!
