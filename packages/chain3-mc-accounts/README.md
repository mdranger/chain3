# chain3-mc-accounts

This is a sub package of [chain3.js][repo]

This is the accounts package to be used in the `chain3-mc` package.
Please read the [documentation][docs] for more.
Please not that MOAC used the same account structure as ETHEREUM project so the account generated in ETHEREUM WEB3 can be used in MOAC.

## Installation

### Node.js

```bash
npm install chain3-mc-accounts
```

### In the Browser

Build running the following in the [chain3.js][repo] repository:

```bash
npm run-script build-all
```

Then include `dist/chain3-mc-accounts.js` in your html file.
This will expose the `Chain3McAccounts` object on the window object.


## Usage

```js
// in node.js
var Chain3McAccounts = require('chain3-mc-accounts');

var account = new Chain3McAccounts('ws://localhost:8546');
account.create();
> {
  address: '0x2c7536E3605D9C16a7a3D7b1898e529396a65c23',
  privateKey: '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318',
  signTransaction: function(tx){...},
  sign: function(data){...},
  encrypt: function(password){...}
}
```

[docs]: https://moacdocs-chn.readthedocs.io/zh_CN/latest/moac/js/index.html
[repo]: https://github.com/MOACChain/chain3/tree/1.x


