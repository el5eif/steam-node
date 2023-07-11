[![npm version](https://badge.fury.io/js/steam-node.svg)](https://badge.fury.io/js/steam-node)

# steam-node

> A NodeJS wrapper for Steam's APIs

## Table of Contents

- [steam-node](#steam-node)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Importing](#importing)
  - [Usage](#usage)
    - [Initiating the wrapper](#initiating-the-wrapper)
    - [Using the API](#using-the-api)
    - [Other API functions](#other-api-functions)

## Installation

To install the library, run:

```sh
$ npm install steam-node
```

or with JSDelivr:

```html
<script src="https://cdn.jsdelivr.net/npm/steam-node@latest/file"></script>
```

## Importing

With `require`:
```js
const API = require("steam-node");
```
With `import`:
```js
import API from "steam-node";
```

## Usage

#### Initiating the wrapper
```js
import API from "steam-node";

const api = new API({
    user: '', // Steamworks Web API user authentication key (optional)
    publisher: '' // Steamworks Web API publisher authentication key (optional)
}, error) // Whether or not to throw an error when an invalid API response is received 
```

#### Using the API
Wrapper responses and endpoints can be found at  the [Steamworks Web API Reference](https://partner.steamgames.com/doc/webapi).
```js
import API from "steam-node";
const api = new API({ user })

await api.getAccountList() // https://partner.steamgames.com/doc/webapi/IGameServersService
await api.beginHTTPUpload(name, value) // https://partner.steamgames.com/doc/webapi/ICloudService
```
Note that some API endpoints do not require an API key.