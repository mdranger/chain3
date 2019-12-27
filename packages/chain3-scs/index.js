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
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 * Update with chain3 packages
 * chain3-mc-accounts
 */

"use strict";

var _ = require('underscore');
var core = require('web3-core');
var helpers = require('web3-core-helpers');
var Subscriptions = require('web3-core-subscriptions').subscriptions;
var Method = require('../../chain3-core-method'); 
var utils = require('web3-utils');
 
   
var BaseContract = require('../../chain3-mc-contract');
var abi = require('web3-eth-abi');

var formatter = helpers.formatters;



var Scs = function Scs() {
    var _this = this;

    core.packageInit(this, arguments);

    // overwrite setProvider
    var setProvider = this.setProvider;
    this.setProvider = function () {
        setProvider.apply(_this, arguments);
        _this.net.setProvider.apply(_this, arguments);
        _this.personal.setProvider.apply(_this, arguments);
        _this.accounts.setProvider.apply(_this, arguments);
        _this.Contract.setProvider(_this.currentProvider, _this.accounts);
    };


    var hive = null;
    var info = null;

    Object.defineProperty(this, 'hive', {
        get: function () {
            return hive;
        },
        set: function (val) {
            if(val) {
                hive = utils.toChecksumAddress(formatter.inputAddressFormatter(val));
            }


            return val;
        },
        enumerable: true
    });
    Object.defineProperty(this, 'info', {
        get: function () {
            return info;
        },
        set: function (info) {
            info = val;


            return val;
        },
        enumerable: true
    });


    this.clearSubscriptions = _this._requestManager.clearSubscriptions;



    var self = this;


    var methods = [
        new Method({
            name: 'directCall',
            call: 'scs_directCall',
            params: 1,
			inputFormatter: [formatter.inputCallFormatter]
        }),
        new Method({
            name: 'getBlock',
            call: 'scs_getBlock',
            params: 2,
			inputFormatter: [formatter.inputAddressFormatter,formatter.inputDefaultBlockNumberFormatter]
        }),
        new Method({
        name: 'getBlockList',
            call: 'scs_getBlockList',
            params: 3,
			inputFormatter: [formatter.inputAddressFormatter,utils.numberToHex,utils.numberToHex]
        }),
        new Method({
            name: 'getDappState',
            call: 'scs_getDappState',
            params: 1,
			inputFormatter: [formatter.inputAddressFormatter],
            outputFormatter: utils.hexToNumber
        }),
        new Method({
            name: 'getMicroChainList',
            call: 'scs_getMicroChainList',
            params: 0
        }),
        new Method({
            name: 'getSCSId',
            call: 'scs_getSCSId',
            params: 0
        }),
        new Method({
            name: 'getReceiptByHash',
            call: 'scs_getReceiptByHash',
            params: 2,
            inputFormatter: [formatter.inputAddressFormatter,null]
        }),
        new Method({
            name: 'getReceiptByNonce',
            call: 'scs_getReceiptByNonce',
            params: 3,
            inputFormatter: [formatter.inputAddressFormatter,null,null]
        }),
        new Method({
            name: 'getTransactionByHash',
            call: 'scs_getTransactionByHash',
            params: 2,
            inputFormatter: [formatter.inputAddressFormatter,null]
        }),
        new Method({
            name: 'getTransactionByNonce',
            call: 'scs_getTransactionByNonce',
            params: 3,
            inputFormatter: [formatter.inputAddressFormatter,null, null]
        }),
		new Method({
            name: 'getExchangeByAddress',
            call: 'scs_getExchangeByAddress',
            params: 10,
            inputFormatter: [formatter.inputAddressFormatter,
			 formatter.inputAddressFormatter,utils.hexToNumber,
			 utils.hexToNumber, utils.hexToNumber, 
			 utils.hexToNumber,utils.hexToNumber,
			 utils.hexToNumber,utils.hexToNumber,
			 utils.hexToNumber,utils.hexToNumber,
			 utils.hexToNumber]
        }),
		new Method({
            name: 'getExchangeInfo',
            call: 'scs_getExchangeInfo',
            params: 10,
            inputFormatter: [formatter.inputAddressFormatter,
			 formatter.inputAddressFormatter,utils.hexToNumber,
			 utils.hexToNumber, utils.hexToNumber, 
			 utils.hexToNumber,utils.hexToNumber,
			 utils.hexToNumber,utils.hexToNumber,
			 utils.hexToNumber,utils.hexToNumber,
			 utils.hexToNumber]
			 }),
		new Method({
            name: 'getTxpool',
            call: 'scs_getTxpool',
            params: 1,
            inputFormatter: [formatter.inputAddressFormatter]
        }),
		new Method({
            name: 'getMicroChainInfo',
            call: 'scs_getMicroChainInfo',
            params: 1,
            inputFormatter: [formatter.inputAddressFormatter]
        }),
		new Method({
            name: 'getBalance',
            call: 'scs_getBalance',
            params: 2,
            inputFormatter: [formatter.inputAddressFormatter,formatter.inputAddressFormatter]
        }),
		new Method({
            name: 'getBlockNumber',
            call: 'scs_getBlockNumber',
            params: 1,
            inputFormatter: [formatter.inputAddressFormatter]
        }),
		new Method({
            name: 'getNonce',
            call: 'scs_getNonce',
            params: 2,
            inputFormatter: [formatter.inputAddressFormatter,formatter.inputAddressFormatter]
        })

    ];

	

    methods.forEach(function(method) {		
        method.attachToObject(_this);
        method.setRequestManager(_this._requestManager, _this.accounts); // second param means is eth.accounts (necessary for wallet signing)
		//console.log('mc, foreach after set manager');
	method.defaultBlock = _this.defaultBlock;
        method.defaultAccount = _this.defaultAccount;
    });

};

core.addProviders(Scs);


module.exports = Scs;

