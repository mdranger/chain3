# chain3-mc-ens

This is a sub package of [web3.js][repo]

This is the contract package to be used in the `chain3-mc` package.
Please read the [documentation][docs] for more.

## Installation

### Node.js

```bash
npm install chain3-mc-ens
```

### In the Browser

Build running the following in the [web3.js][repo] repository:

```bash
npm run-script build-all
```

Then include `dist/chain3-mc-ens.js` and `dist/chain3-mc.js` in your html file.
This will expose the `EthEns` object on the window object.

## Usage

```js
    var eth = new Web3Eth(web3.currentProvider);
    var ens = new EthEns(eth);
    
    ens.getAddress('ethereum.eth').then(function (result) {
      console.log(result);
    });
```



[docs]: https://moacdocs-chn.readthedocs.io/zh_CN/latest/moac/js/index.html
[repo]: https://github.com/MOACChain/chain3/tree/1.x


