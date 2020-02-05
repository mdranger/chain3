/*
 This file is part of chain3.js.

 web3.js is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 web3.js is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Lesser General Public License for more details.

 You should have received a copy of the GNU Lesser General Public License
 along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * @file index.js
 * @author moac tech
 * @date 2019
 * Used to connect with SCS server to provide RPC methods
 * 2020/01/20, the follow methods are implemented in SCS RPC methods
    scs_directCall
    scs_getBalance
    scs_getBlock
    scs_getBlockNumber
    scs_getDappList
    scs_getDappState
    scs_getAppChainInfo
    scs_getAppChainList
    scs_getNonce
    scs_getSCSId
    scs_getTransactionByHash
    scs_getTransactionByNonce
    scs_getReceiptByHash
    scs_getReceiptByNonce
    scs_getExchangeByAddress
    scs_getExchangeInfo
    scs_getTxpool

Major changes comparing with mc:
1. Use AppChain object to replace the Contract object(TODO);
2. 
 */

"use strict";

var _ = require('underscore');
var core = require('web3-core');
var helpers = require('web3-core-helpers');
// var Subscriptions = require('web3-core-subscriptions').subscriptions;
var Method = require('../../chain3-core-method'); 
var utils = require('web3-utils');
var Net = require('web3-net');

var Personal = require('web3-eth-personal');
var BaseContract = require('../../chain3-mc-contract');//

// var abi = require('web3-eth-abi');

var getNetworkType = require('./getNetworkType.js');
var formatter = helpers.formatters;
var Accounts = require('../../chain3-mc-accounts');

// SCS block rom number or hash, notice args[0] should be the AppChain address
var blockCall = function (args) {
    return (_.isString(args[1]) && args[1].indexOf('0x') === 0) ? "scs_getBlockByHash" : "scs_getBlockByNumber";
};

var transactionFromBlockCall = function (args) {
    return (_.isString(args[1]) && args[1].indexOf('0x') === 0) ? 'scs_getTransactionByBlockHashAndIndex' : 'scs_getTransactionByBlockNumberAndIndex';
};

var getTransaction = function (args) {
    return (_.isString(args[1]) && args[1].indexOf('0x') === 0) ? 'scs_getTransactionByHash' : 'scs_getTransactionByNonce';
};

var getReceipt = function (args) {
    return (_.isString(args[1]) && args[1].indexOf('0x') === 0) ? 'scs_getReceiptByHash' : 'scs_getReceiptByNonce';
};

// Object constructor for the SCS server
var Scs = function SCSServer() {
    var _this = this;

    // sets _requestmanager
    // 
    core.packageInit(this, arguments);

    // overwrite setProvider
    var setProvider = this.setProvider;
    this.setProvider = function () {
        setProvider.apply(_this, arguments);
        _this.net.setProvider.apply(_this, arguments);
        _this.personal.setProvider.apply(_this, arguments);
        _this.accounts.setProvider.apply(_this, arguments);
        // _this.Contract.setProvider(_this.currentProvider, _this.accounts);
    };

    // For SCS, default account is the SCSId
    // Default AppChain is the first AppChain on the SCS server
    var defaultAccount = null;
    var defaultBlock = 'latest';
    var defaultAppChain = null; 

    Object.defineProperty(this, 'defaultAccount', {
        get: function () {
            return defaultAccount;
        },
        set: function (val) {
            if(val) {
                defaultAccount = utils.toChecksumAddress(formatter.inputAddressFormatter(val));
            }

            // also set on the AppChain object
            // _this.Contract.defaultAccount = defaultAccount;
            _this.personal.defaultAccount = defaultAccount;

            // update defaultBlock
            methods.forEach(function(method) {
                method.defaultAccount = defaultAccount;
            });

            return val;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'defaultBlock', {
        get: function () {
            return defaultBlock;
        },
        set: function (val) {
            defaultBlock = val;
            // also set on the Contract object
            // _this.Contract.defaultBlock = defaultBlock;
            _this.personal.defaultBlock = defaultBlock;

            // update defaultBlock
            methods.forEach(function(method) {
                method.defaultBlock = defaultBlock;
            });

            return val;
        },
        enumerable: true
    });


    // this.clearSubscriptions = _this._requestManager.clearSubscriptions;

    // add net
    this.net = new Net(this.currentProvider);
    // add chain detection
    this.net.getNetworkType = getNetworkType.bind(this);

    // add accounts
    this.accounts = new Accounts(this.currentProvider);

    // add personal
    this.personal = new Personal(this.currentProvider);
    this.personal.defaultAccount = this.defaultAccount;

    // create a proxy Contract type for this instance, as a Contract's provider
    // is stored as a class member rather than an instance variable. If we do
    // not create this proxy type, changing the provider in one instance of
    // chain3-mc would subsequently change the provider for _all_ contract
    // instances!
    var self = this;
    /*
    var Contract = function Contract() {
        BaseContract.apply(this, arguments);

        // when Eth.setProvider is called, call packageInit
        // on all contract instances instantiated via this Eth
        // instances. This will update the currentProvider for
        // the contract instances
        var _this = this;
        var setProvider = self.setProvider;
        self.setProvider = function() {
          setProvider.apply(self, arguments);
          core.packageInit(_this, [self.currentProvider]);
        };
    };

    Contract.setProvider = function() {
        BaseContract.setProvider.apply(this, arguments);
    };

    // make our proxy Contract inherit from chain3-mc-contract so that it has all
    // the right functionality and so that instanceof and friends work properly
    Contract.prototype = Object.create(BaseContract.prototype);
    Contract.prototype.constructor = Contract;

    // add contract
    this.Contract = Contract;
    this.Contract.defaultAccount = this.defaultAccount;
    this.Contract.defaultBlock = this.defaultBlock;
    this.Contract.setProvider(this.currentProvider, this.accounts);
*/

    // add ABI for SCS type
    // this.abi = abi;

    // scs_directCall
    // scs_getBalance
    // scs_getBlock
    // scs_getBlockNumber
    // scs_getDappList
    // scs_getDappState
    // scs_getAppChainInfo
    // scs_getAppChainList
    // scs_getNonce
    // scs_getSCSId
    // scs_getTransactionByHash
    // scs_getTransactionByNonce
    // scs_getReceiptByHash
    // scs_getReceiptByNonce
    // scs_getExchangeByAddress
    // scs_getExchangeInfo
    // scs_getTxpool

    var methods = [
        // Not supported by MOAC
         //new Method({
          //   name: 'getNodeInfo',
          //   call: 'chain3_clientVersion'
         //}),

        new Method({
            name: 'directCall',
            call: 'scs_directCall',
            params: 1,
            inputFormatter: formatter.inputAddressFormatter
         }),
        new Method({
            name: 'getAppChainInfo',
            call: 'scs_getAppChainInfo',
            params: 1,
            inputFormatter: formatter.inputAddressFormatter
         }),
        new Method({
            name: 'getDappState',
            call: 'scs_getDappState',
            params: 1,
            inputFormatter: formatter.inputAddressFormatter
         }),
         new Method({
            name: 'getPastLogs',
            call: 'scs_getLogs',
            params: 1,
            inputFormatter: [formatter.inputLogFormatter],
            outputFormatter: formatter.outputLogFormatter
         }),
        new Method({
            name: 'protocolVersion',
            call: 'scs_protocolVersion',
            params: 0
        }),
        new Method({
            name: 'getSCSId',
            call: 'scs_getSCSId',
            params: 0
        }),
        new Method({
            name: 'getDatadir',
            call: 'scs_datadir',
            params: 0
        }),
        new Method({
            name: 'getDappAddrList',
            call: 'scs_getDappAddrList',
            params: 0,
            outputFormatter: utils.toChecksumAddress
        }),
        new Method({
            name: 'isSyncing',
            call: 'scs_syncing',
            params: 0,
            outputFormatter: formatter.outputSyncingFormatter
        }),
        new Method({
            name: 'getDappList',
            call: 'scs_getDappList',
            params: 1,
            inputFormatter: formatter.inputAddressFormatter,
            outputFormatter: utils.toChecksumAddress
        }),
        new Method({
            name: 'getAppChainList',// depreted getMicroChainList
            call: 'scs_getAppChainList',
            params: 0,
            outputFormatter: utils.toChecksumAddress
        }),
        new Method({
            name: 'getBlockNumber',
            call: 'scs_blockNumber',
            params: 1,
            inputFormatter: formatter.inputAddressFormatter,
            outputFormatter: utils.hexToNumber
        }),
        new Method({
            name: 'getNonce',
            call: 'scs_getNonce',
            params: 2,
            inputFormatter: [formatter.inputAddressFormatter, formatter.inputAddressFormatter],
            outputFormatter: formatter.outputBigNumberFormatter
        }),
        new Method({
            name: 'getBalance',
            call: 'scs_getBalance',
            params: 3,
            inputFormatter: [formatter.inputAddressFormatter, formatter.inputAddressFormatter, formatter.inputDefaultBlockNumberFormatter],
            outputFormatter: formatter.outputBigNumberFormatter
        }),
        // new Method({
        //     name: 'getStorageAt',
        //     call: 'scs_getStorageAt',
        //     params: 3,
        //     inputFormatter: [formatter.inputAddressFormatter, utils.numberToHex, formatter.inputDefaultBlockNumberFormatter]
        // }),
        // new Method({
        //     name: 'getCode',
        //     call: 'scs_getCode',
        //     params: 2,
        //     inputFormatter: [formatter.inputAddressFormatter, formatter.inputDefaultBlockNumberFormatter]
        // }),
        new Method({
            name: 'getBlock',
            call: blockCall,
            params: 3,
            inputFormatter: [formatter.inputAddressFormatter, formatter.inputBlockNumberFormatter, function (val) { return !!val; }],
            outputFormatter: formatter.outputBlockFormatter
        }),
        // new Method({
        //     name: 'getBlockTransactionCount',
        //     call: getBlockTransactionCountCall,
        //     params: 1,
        //     inputFormatter: [formatter.inputBlockNumberFormatter],
        //     outputFormatter: utils.hexToNumber
        // }),
        // new Method({
        //     name: 'getBlockUncleCount',
        //     call: uncleCountCall,
        //     params: 1,
        //     inputFormatter: [formatter.inputBlockNumberFormatter],
        //     outputFormatter: utils.hexToNumber
        // }),
        new Method({
            name: 'getTransaction',
            call: getTransaction,
            params: 2,
            inputFormatter: [formatter.inputAddressFormatter, null],
            outputFormatter: formatter.outputTransactionFormatter
        }),
        // new Method({
        //     name: 'getTransaction',
        //     call: 'eth_getTransactionByHash',
        //     params: 1,
        //     inputFormatter: [null],
        //     outputFormatter: formatter.outputTransactionFormatter
        // }),
        new Method({
            name: 'getTransactionFromBlock',
            call: transactionFromBlockCall,
            params: 3,
            inputFormatter: [formatter.inputAddressFormatter, formatter.inputBlockNumberFormatter, utils.numberToHex],
            outputFormatter: formatter.outputTransactionFormatter
        }),
        new Method({
            name: 'getReceiptByHash',
            call: 'scs_getReceiptByHash',
            params: 2,
            inputFormatter: [formatter.inputAddressFormatter, null],
            outputFormatter: formatter.outputTransactionReceiptFormatter
        }),
        new Method({
            name: 'getReceiptByNonce',
            call: 'scs_getReceiptByNonce',
            params: 2,
            inputFormatter: [formatter.inputAddressFormatter, null],
            outputFormatter: formatter.outputTransactionReceiptFormatter
        }),
        new Method({
            name: 'getTxpool',
            call: 'scs_getTxpool',
            params: 1,
            inputFormatter: formatter.inputAddressFormatter
        }),
        // AppChain address + account address
        new Method({
            name: 'getExchangeByAddress',
            call: 'scs_getExchangeByAddress',
            params: 2,
            inputFormatter: [formatter.inputAddressFormatter,formatter.inputAddressFormatter]
        }),
        new Method({
            name: 'getExchangeInfo',
            call: 'scs_getExchangeInfo',
            params: 1,
            inputFormatter: formatter.inputAddressFormatter
        }),
        new Method({
            name: 'getTransactionCount',
            call: 'scs_getTransactionCount',
            params: 3,
            inputFormatter: [formatter.inputAddressFormatter, formatter.inputAddressFormatter, formatter.inputDefaultBlockNumberFormatter],
            outputFormatter: utils.hexToNumber
        }),
        // new Method({
        //     name: 'sendSignedTransaction',
        //     call: 'scs_sendRawTransaction',
        //     params: 2,
        //     inputFormatter: [null]
        // }),
        new Method({
            name: 'signTransaction',
            call: 'scs_signTransaction',
            params: 1,
            inputFormatter: [formatter.inputTransactionFormatter]
        }),
        // new Method({
        //     name: 'sendTransaction',
        //     call: 'mc_sendTransaction',
        //     params: 1,
        //     inputFormatter: [formatter.inputTransactionFormatter]
        // }),
        new Method({
            name: 'sign',
            call: 'scs_sign',
            params: 2,
            inputFormatter: [formatter.inputSignFormatter, formatter.inputAddressFormatter],
            transformPayload: function (payload) {
                payload.params.reverse();
                return payload;
            }
        }),
        // new Method({
        //     name: 'call',
        //     call: 'mc_call',
        //     params: 2,
        //     inputFormatter: [formatter.inputCallFormatter, formatter.inputDefaultBlockNumberFormatter]
        // }),
        // new Method({
        //     name: 'estimateGas',
        //     call: 'mc_estimateGas',
        //     params: 1,
        //     inputFormatter: [formatter.inputCallFormatter],
        //     outputFormatter: utils.hexToNumber
        // }),
        // new Method({
        //     name: 'submitWork',
        //     call: 'mc_submitWork',
        //     params: 3
        // }),
        new Method({
            name: 'getWork',
            call: 'scs_getWork',
            params: 0
        }),


        // SCS not providing subscription service. 
        // subscriptions
/*
        new Subscriptions({
            name: 'subscribe',
            type: 'mc',
            subscriptions: {
                'newBlockHeaders': {
                    // TODO rename on RPC side?
                    subscriptionName: 'newHeads', // replace subscription with this name
                    params: 0,
                    outputFormatter: formatter.outputBlockFormatter
                },
                'pendingTransactions': {
                    subscriptionName: 'newPendingTransactions', // replace subscription with this name
                    params: 0
                },
                'logs': {
                    params: 1,
                    inputFormatter: [formatter.inputLogFormatter],
                    outputFormatter: formatter.outputLogFormatter,
                    // DUBLICATE, also in chain3-mc-contract
                    subscriptionHandler: function (output) {
                        if(output.removed) {
                            this.emit('changed', output);
                        } else {
                            this.emit('data', output);
                        }

                        if (_.isFunction(this.callback)) {
                            this.callback(null, output, this);
                        }
                    }
                },
                'syncing': {
                    params: 0,
                    outputFormatter: formatter.outputSyncingFormatter,
                    subscriptionHandler: function (output) {
                        var _this = this;

                        // fire TRUE at start
                        if(this._isSyncing !== true) {
                            this._isSyncing = true;
                            this.emit('changed', _this._isSyncing);

                            if (_.isFunction(this.callback)) {
                                this.callback(null, _this._isSyncing, this);
                            }

                            setTimeout(function () {
                                _this.emit('data', output);

                                if (_.isFunction(_this.callback)) {
                                    _this.callback(null, output, _this);
                                }
                            }, 0);

                            // fire sync status
                        } else {
                            this.emit('data', output);
                            if (_.isFunction(_this.callback)) {
                                this.callback(null, output, this);
                            }

                            // wait for some time before fireing the FALSE
                            clearTimeout(this._isSyncingTimeout);
                            this._isSyncingTimeout = setTimeout(function () {
                                if(output.currentBlock > output.highestBlock - 200) {
                                    _this._isSyncing = false;
                                    _this.emit('changed', _this._isSyncing);

                                    if (_.isFunction(_this.callback)) {
                                        _this.callback(null, _this._isSyncing, _this);
                                    }
                                }
                            }, 500);
                        }
                    }
                }
            }
        })*/
    ];

    // Attach the deafult properties to the methods
    methods.forEach(function(method) {
        method.attachToObject(_this);
        method.setRequestManager(_this._requestManager, _this.accounts); // second param means is accounts (necessary for wallet signing)
        method.defaultBlock = _this.defaultBlock;
        method.defaultAccount = _this.defaultAccount;
        method.defaultAppChain = _this.defaultAppChain;
    });

};

core.addProviders(Scs);


module.exports = Scs;

