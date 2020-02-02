# chain3-core-method

This is a sub package of [chain3.js][repo]

The Method package used within most [chain3.js][repo] packages.
Please read the [documentation][docs] for more.

## Installation

### Node.js

```bash
npm install chain3-core-method
```

### In the Browser

Build running the following in the [chain3.js][repo] repository:

```bash
npm run-script build-all
```

Then include `dist/chain3-core-method.js` in your html file.
This will expose the `Chain3Method` object on the window object.


## Usage

```js
// in node.js
var Chain3Method = require('chain3-core-method');

var method = new Chain3Method({
    name: 'sendTransaction',
    call: 'mc_sendTransaction',
    params: 1,
    inputFormatter: [inputTransactionFormatter]
});
method.attachToObject(exampleLib);

exampleLib.sendTransaction({...}, function(){ ... });
```


[docs]: https://moacdocs-chn.readthedocs.io/zh_CN/latest/moac/js/index.html
[repo]: https://github.com/MOACChain/chain3/tree/1.x


