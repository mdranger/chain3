# chain3-utils

This is a sub package of [chain3.js][repo]

This contains useful utility functions for Dapp developers.   
Please read the [documentation][docs] for more.

## Installation

### Node.js

```bash
npm install chain3-utils
```

### In the Browser

Build running the following in the [chain3.js][repo] repository:

```bash
npm run-script build-all
```

Then include `dist/chain3-utils.js` in your html file.
This will expose the `Chain3Utils` object on the window object.


## Usage

```js
// in node.js
var Chain3Utils = require('chain3-utils');
console.log(Chain3Utils);
{
    sha3: function(){},
    soliditySha3: function(){},
    isAddress: function(){},
    ...
}
```
[docs]: https://moacdocs-chn.readthedocs.io/zh_CN/latest/moac/js/index.html
[repo]: https://github.com/MOACChain/chain3/tree/1.x




