/*
    This file is part of chain3.js.

    chain3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    chain3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with chain3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/*
  Chain3 use chain3.js 1.0 packages to be compatible with Ethereum developers.
*/

"use strict";


var version = require('../package.json').version;
var core = require('web3-core');
var Net = require('web3-net');
var Personal = require('web3-eth-personal');
var utils = require('web3-utils');
var Mc = require('../../chain3-mc');
// var Mc = require('chain3-mc');
var Scs = require('../../chain3-scs');

// Constructor of the Chain3 object
// add scs, appchain(later)
var Chain3 = function Chain3() {
    var _this = this;

    // sets _requestmanager etc
    //console.log("chain3 will package init");
    core.packageInit(this, arguments);

    this.version = version;
    this.utils = utils;

    this.mc = new Mc(this);
    this.scs = new Scs(this);

    // overwrite package setProvider
    var setProvider = this.setProvider;
    this.setProvider = function (provider, net) {
        setProvider.apply(_this, arguments);
		//console.log("chain3 will set provider");

        this.mc.setProvider(provider, net);

        return true;
    };

    // For AppChain usage
    var setScsProvider = this.setScsProvider;
    this.setScsProvider = function (provider, net) {
        setScsProvider.apply(_this, arguments);
        //console.log("chain3 will set provider");

        this.scs.setProvider(provider, net);

        return true;
    };
};

Chain3.version = version;
Chain3.utils = utils;
Chain3.modules = {
    Mc: Mc,
    Scs: Scs,
    Net: Net,
    Personal: Personal
};
//console.log("chain3 will add provider");
// Notice this only add VNODE providers, 
// SCS provider only in the scs obj
core.addProviders(Chain3);

module.exports = Chain3;

