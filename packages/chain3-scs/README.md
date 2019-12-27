# chain3-scs

This is a sub package of [chain3.js][repo]

This is the Eth package to be used [chain3.js][repo].
Please read the [documentation][docs] for more.

## Installation

### Node.js

```bash
npm install chain3-scs
```

### In the Browser

Build running the following in the [web3.js][repo] repository:

```bash
npm run-script build-all
```

Then include `dist/chain3-mc.js` in your html file.
This will expose the `Chain3Mc` object on the window object.


## Usage

```js
// in node.js
var Chain3Scs = require('chain3-scs');

var mc = new Chain3Scs('ws://localhost:8546');
```


[docs]: http://web3js.readthedocs.io/en/1.0/
[repo]: https://github.com/ethereum/web3.js


