# Usage

`@xpfw/ui` packages provide 4 components one for each of the CRUD operations.

## Parameters
For this example we will use `@xpfw/ui-bulma` to have some out of the box working examples.
For custom styling you can [wrap your own components](#custom) and replace the imported ones from `@xpfw/ui-bulma`
The parameters are minimal: They all require an `IForm` and optionally take a prefix. If it's an edit, show or delete you also need to supply an id. If it's a show you don't even need a form just the `collection` name.
```typescript
import {
  BulmaCreate, BulmaEdit, BulmaDelete, BulmaShow, BulmaList
} from "@xpfw/ui-bulma"

// replace with your own
const form =  {
  model: "testModel",
  collection: "testCol",
  sections: [{fields: [{
    mapTo: "myString",
    type: FieldType.Text,
    validate: {required: {type: RequiredType.Always}}
  }]}]
}

<BulmaCreate form={form} prefix="optionalPrefix" />
<BulmaEdit form={form} prefix="optionalPrefix" id="idOfEditedItem" />
<BulmaDelete form={form} prefix="optionalPrefix" id="idOfEditedItem" />
<BulmaShow collection={form.collection} id="idOfItem" />
<BulmaList form={form} prefix="optionalPrefix" />
```

## Custom
The ui-bulma package was built to provide a quick start. Most probably you will want to roll your own style and let xpfw only take care of data flow.
This is where `@xpfw/ui-shared` shines at.
For every of the 4 CRUD operation's there is a [higher order component (HOC)](https://reactjs.org/docs/higher-order-components.html) as well as for lists and authentication (login / registration / logout):

[Create](#create), [Read](#read), [Update](#edit), [Remove](#delete), [List](#list), [Authentication](#authentication)

Wrapped components can be used as shown in the [previous code sample](#parameters).
For complete code examples of wrapped components you can look at the implementations used for the demo site:

[Create](https://github.com/xpfw/xpfw/packages/site/src/components/ui/create.tsx), [Read](https://github.com/xpfw/xpfw/packages/site/src/components/ui/relationshipListItem.tsx), [Update](#https://github.com/xpfw/xpfw/packages/site/src/components/ui/edit.tsx), [Remove](#delete), [List](https://github.com/xpfw/xpfw/packages/site/src/components/ui/list.tsx)

### Create
`SharedFormCreate`
The wrapped component will have the following props available
- `submitCreate` => Call this and the `create` call will be called. `state` and `error` will update respectively
- `fields` => Array of `IFields` that should be rendered
- `state` => Status of the creation. Object with `loading` and `result` keys
- `error` => null if none otherwise array of invalid fields

### Read
`SharedFormShow`
- `item` => either null or the requested object from `collection` and `id` combination

### Edit
`SharedFormEdit`
The wrapped component will have the following props available
- `submitEdit` => Call this and the `edit` call will be called. `state` and `error` will update respectively
- `fields` => Array of `IFields` that should be rendered
- `state` => Status of the edit. Object with `loading` and `result` keys
- `error` => null if none otherwise array of invalid fields
- `original` => the original unmodified document

### Delete
`SharedFormRemove`
The wrapped component will have the following props available
- `submitRemove` => Call this and the `edit` call will be called. `state` and `error` will update respectively
- `state` => Status of the edit. Object with `loading` and `result` keys
- `error` => null if none otherwise array of invalid fields

### List
`SharedFormList`
The wrapped component will have the following props available
- `nextPage` => Increase page count, load content of next page and hence change content of `list`
- `prevPage` => Decrease page count, load content of previous page and hence change content of `list`
- `list` => Array of found items you can render
- `currentPage` => null if none otherwise array of invalid fields
- `maxPage` => null if none otherwise array of invalid fields
- `showNextPage` => convenience prop to know whether there are more pages available or not based on comparison of currentPage and maxPage
- `showPrevPage` => convenience prop to know whether there are earlier pages available or not based on comparison of currentPage and maxPage

### Authentication
`SharedFormAuth`
The wrapped component will have the following props available
- `submitLogin` => Call this and the `login` will be called with the value of MailField and PwField. `error`, `user` and `loading` will update respectively
- `submitLogout` => Call this and the `logout` will be called with the value of MailField and PwField. `error`, `user` and `loading` will update respectively
- `submitRegister` => Call this and the `registration` will be called with the value of MailField and PwField. `error`, `user` and `loading` will update respectively
- `loggedIn` => true if successfully logged in
- `user` => Currently logged in user. Null if not logged in
- `error` => null if none otherwise array of invalid fields