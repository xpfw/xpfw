# Usage
`@xpfw/data` packages provide 4 hooks. One for each of the CRUD operations.
> [Click here](https://xpfw.github.io/form) to see a live demo of `@xpfw/data`

## Quick Start
If you want a full CRUD UI from a JSON-Schema out of the box you can use use `@xpfw/data-bulma`.
For custom styling you can [use the hooks](#hooks) in your own components!
The parameters are minimal: They all require an `ExtendedJSONSchema` and optionally take a prefix. If it's an edit, show or delete you also need to supply an id. If it's a show you don't even need a form just the `collection` name.
```typescript
import {
  BulmaCreate, BulmaEdit, BulmaDelete, BulmaShow, BulmaList
} from "@xpfw/data-bulma"

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

<BulmaCreate schema={schema} prefix="optionalPrefix" />
<BulmaEdit schema={schema} prefix="optionalPrefix" id="idOfEditedItem" />
<BulmaDelete schema={schema} prefix="optionalPrefix" id="idOfEditedItem" />
<BulmaShow schema={schema} id="idOfItem" />
<BulmaList schema={schema} prefix="optionalPrefix" />
```

## Hooks
The `@xpfw/data-bulma` package was built to provide a quick start. Most probably you will want to customize the components and let `@xpfw/data` only focus on providing the data.
For every of the 4 CRUD operation's there is a [React hook](https://reactjs.org/docs/hooks-intro.html) as well as for lists and authentication (login / registration / logout):

[Create](#create), [Read](#read), [Update](#edit), [Remove](#delete), [List](#list), [Authentication](#authentication)

For complete code examples of wrapped components you can look at the implementations used for the demo site:

[Create](https://github.com/xpfw/xpfw/blob/master/site/src/components/ui/create.tsx), [Read](https://github.com/xpfw/xpfw/blob/master/site/src/components/ui/relationshipListItem.tsx), [Update](#https://github.com/xpfw/xpfw/blob/master/site/src/components/ui/edit.tsx), [Remove](#delete), [List](https://github.com/xpfw/xpfw/blob/master/site/src/components/ui/list.tsx)


### Create
Example usage of the `useCreate` Hook can be found [here](https://github.com/xpfw/xpfw/blob/master/site/src/components/ui/create.tsx)
Expects:
- `schema` => `ExtendedJSONSchema` conform JSON-Schema
- (optional) `mapTo` => use for FormStore path instead of `schema.title`
- (optional) `prefix` => prepend to FormStore path
Provides the following properties:
- `submitCreate` => Call this and the `create` call will be called. `state`, `loading` and `error` will update respectively
- `state` => Status of the creation
- `loading` => boolean indicating business
- `error` => null if none otherwise array of invalid fields
- `user` => currently logged in user

### Read
Example usage of the `useGet` hook can be found [here](https://github.com/xpfw/xpfw/blob/master/packages/data-bulma/src/components/show.tsx)
Expects:
- `id` => The ID of the requested record
- `collection` => The name of the collection to fetch the record from
Provides the following properties:
- `item` => either null or the requested object from `collection` and `id` combination
- `loading` => boolean indicating business

### Edit
Example usage of the `useEdit` hook can be found [here](#https://github.com/xpfw/xpfw/blob/master/site/src/components/ui/edit.tsx)
Expects:
- `id` => The ID of the record to edit
- `schema` => `ExtendedJSONSchema` conform JSON-Schema. The `collection` property is required if used in this hook!
- (optional) `mapTo` => use for FormStore path instead of `schema.title`
- (optional) `prefix` => prepend to FormStore path
Provides the following properties:
- `submitEdit` => Call this and the `edit` call will be called. `state`, `loading` and `error` will update respectively
- `state` => Status of the creation
- `loading` => boolean indicating business
- `error` => null if none otherwise array of invalid fields
- `user` => currently logged in user

### Delete
`useRemove`
Example usage of the `useRemove` hook can be found [here](#https://github.com/xpfw/xpfw/blob/master/packages/data-bulma/src/components/remove.tsx)
Expects:
- `id` => The ID of the record to remove
- `schema` => `ExtendedJSONSchema` conform JSON-Schema. The `collection` property is required if used in this hook!
Provides the following properties:
- `submitRemove` => Call this and the `remove` call will be called. `state`, `loading` and `error` will update respectively
- `state` => Status of the creation
- `loading` => boolean indicating business
- `error` => null if none otherwise array of invalid fields

### List
Example usage of the `useList` Hook can be found [here](https://github.com/xpfw/xpfw/blob/master/site/src/components/ui/list.tsx)
Expects:
- `schema` => `ExtendedJSONSchema` conform JSON-Schema
- (optional) `mapTo` => use for FormStore path instead of `schema.title`
- (optional) `prefix` => prepend to FormStore path
- (optional) `options` => optional advanced options
Provides the following properties:
- `nextPage` => Increase page count, load content of next page and hence change content of `list`
- `prevPage` => Decrease page count, load content of previous page and hence change content of `list`
- `list` => Array of found items you can render
- `currentPage` => null if none otherwise array of invalid fields
- `maxPage` => null if none otherwise array of invalid fields
- `showNextPage` => convenience prop to know whether there are more pages available or not based on comparison of currentPage and maxPage
- `showPrevPage` => convenience prop to know whether there are earlier pages available or not based on comparison of currentPage and maxPage

### Authentication
The `useAuth` hook provides information about the current user.
It provides the following properties:
- `submitLogin` => Call this and the `login` will be called with the value of MailField and PwField. `error`, `user` and `loading` will update respectively
- `submitLogout` => Call this and the `logout` will be called with the value of MailField and PwField. `error`, `user` and `loading` will update respectively
- `submitRegister` => Call this and the `registration` will be called with the value of MailField and PwField. `error`, `user` and `loading` will update respectively
- `loggedIn` => true if successfully logged in
- `connected` => Whether an active connection to the server exists
- `loading` => whether user login/out/register related activites are ongoing
- `user` => Currently logged in user. Null if not logged in
- `error` => null if none otherwise array of invalid fields