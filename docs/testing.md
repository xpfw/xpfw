# Testing

*xpfw* delivers premade tests which you can include to get full code coverage out of your custom styled components!

All tests follow the same "API". It is an exported function, which you give your readily usable React Component. That will be rendered then.

# Form Tests
For tests regarding form component themes there is [@xpfw/form-tests](https://github.com/xpfw/xpfw/packages/xpfw-form-tests/)
It contains the following tests:
- boolean
- select
- text
- location
- object

# UI Tests
For tests regarding UI / CRUD components there is [@xpfw/ui-tests](https://github.com/xpfw/xpfw/packages/xpfw-ui-tests/)
It provides the following tests:
- auth
- create
- edit
- list
- remove
- relationship

> #### Caution::MongoDB required
>
> A running MongoDB instance on localhost is required to run the UI tests!
