# chain3-appchain

This is a sub package of [chain3.js][repo]

This is the package handling the AppChain functions and be used in the `chain3` package.
Please read the [documentation][docs] for more.

## Installation

### Node.js

```bash
npm install chain3-appchain
```

### In the Browser

Build running the following in the [web3.js][repo] repository:

```bash
npm run-script build-all
```

Then include `dist/chain3-appchain.js` in your html file.
This will expose the `Chain3AppChain` object on the window object.


## Usage

```js
// in node.js
var Chain3AppChain = require('chain3-appchain');

// set provider for all later instances to use
Chain3AppChain.setProvider('https://localhost:8546');
Chain3AppChain.setSCSProvider('https://localhost:8548');

var appchain = new Chain3AppChain(jsonInterface, address);
appchain.methods.somFunc().send({from: ....})
.on('receipt', function(){
    ...
});
```


[docs]: https://moacdocs-chn.readthedocs.io/zh_CN/latest/moac/js/index.html
[repo]: https://github.com/MOACChain/chain3/tree/1.x


