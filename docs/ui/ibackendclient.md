# IBackendClient

Connecting your own backend to *xpfw* is as easy as implementing the `IBackendClient` interface.

For an offline plugin you only need to implement
- `get`
- `create`
- `remove`
- `find`
- `patch`

For an online plugin you also need to implement
- `connectTo`
- `disconnect`
- `login`
- `register`
- `logout`

Since *xpfw* is strongly typed your IDE should tell you what parameters to expect. In case you are not using typescript see an abstract from the API docs below.


<a id="client"></a>

##  client

**● client**: *`any`*



___
<a id="connectto"></a>

##  connectTo

**● connectTo**: *`function`*



#### Type declaration
▸(url: *`string`*, options?: * `undefined` &#124; `object`*): `void`

**Parameters:**

| Param | Type |
| ------ | ------ |
| url | `string` |
| `Optional` options |  `undefined` &#124; `object`|

**Returns:** `void`

___
<a id="create"></a>

##  create

**● create**: *`function`*



#### Type declaration
▸(collection: *`string`*, createData: *`any`*): `Promise`<`any`>

**Parameters:**

| Param | Type |
| ------ | ------ |
| collection | `string` |
| createData | `any` |

**Returns:** `Promise`<`any`>

___
<a id="disconnect"></a>

##  disconnect

**● disconnect**: *`function`*



#### Type declaration
▸(): `void`

**Returns:** `void`

___
<a id="find"></a>

##  find

**● find**: *`function`*



#### Type declaration
▸(collection: *`string`*, createData: *`any`*): `Promise`<`any`>

**Parameters:**

| Param | Type |
| ------ | ------ |
| collection | `string` |
| createData | `any` |

**Returns:** `Promise`<`any`>

___
<a id="get"></a>

##  get

**● get**: *`function`*



#### Type declaration
▸(collection: *`string`*, id: *`any`*): `Promise`<`any`>

**Parameters:**

| Param | Type |
| ------ | ------ |
| collection | `string` |
| id | `any` |

**Returns:** `Promise`<`any`>

___
<a id="login"></a>

##  login

**● login**: *`function`*



#### Type declaration
▸(loginData: *`any`*): `Promise`<`object`>

**Parameters:**

| Param | Type |
| ------ | ------ |
| loginData | `any` |

**Returns:** `Promise`<`object`>

___
<a id="logout"></a>

##  logout

**● logout**: *`function`*



#### Type declaration
▸(): `Promise`<`any`>

**Returns:** `Promise`<`any`>

___
<a id="patch"></a>

##  patch

**● patch**: *`function`*



#### Type declaration
▸(collection: *`string`*, id: *`any`*, createData: *`any`*): `Promise`<`any`>

**Parameters:**

| Param | Type |
| ------ | ------ |
| collection | `string` |
| id | `any` |
| createData | `any` |

**Returns:** `Promise`<`any`>

___
<a id="register"></a>

##  register

**● register**: *`function`*



#### Type declaration
▸(registerData: *`any`*): `Promise`<`any`>

**Parameters:**

| Param | Type |
| ------ | ------ |
| registerData | `any` |

**Returns:** `Promise`<`any`>

___
<a id="remove"></a>

##  remove

**● remove**: *`function`*



#### Type declaration
▸(collection: *`string`*, id: *`any`*): `Promise`<`any`>

**Parameters:**

| Param | Type |
| ------ | ------ |
| collection | `string` |
| id | `any` |

**Returns:** `Promise`<`any`>

___

