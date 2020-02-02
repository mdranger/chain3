# chain3-mc-contract

This is a sub package of [chain3.js][repo]

This is the contract package to be used in the `chain3-mc` package.
Please read the [documentation][docs] for more.

## Installation

### Node.js

```bash
npm install chain3-mc-contract
```

### In the Browser

Build running the following in the [web3.js][repo] repository:

```bash
npm run-script build-all
```

Then include `dist/chain3-mc-contract.js` in your html file.
This will expose the `Chain3McContract` object on the window object.


## Usage

```js
// in node.js
var Chain3McContract = require('chain3-mc-contract');

// set provider for all later instances to use
Chain3McContract.setProvider('ws://localhost:8546');

var contract = new Chain3McContract(jsonInterface, address);
contract.methods.somFunc().send({from: ....})
.on('receipt', function(){
    ...
});
```


[docs]: https://moacdocs-chn.readthedocs.io/zh_CN/latest/moac/js/index.html
[repo]: https://github.com/MOACChain/chain3/tree/1.x


