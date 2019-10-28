/*
    This file is part of web3.js.

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
 * @authors:
 *   Fabian Vogelsteller <fabian@ethereum.org>
 *   Gav Wood <gav@parity.io>
 *   Jeffrey Wilcke <jeffrey.wilcke@ethereum.org>
 *   Marek Kotewicz <marek@parity.io>
 *   Marian Oancea <marian@ethereum.org>
 * @date 2017
 * Update to chain3 packages
 * chain3-vnode
 * chain3-scs
 */

"use strict";


var version = require('../package.json').version;
var core = require('web3-core');
var Net = require('web3-net');
var Personal = require('web3-eth-personal');
// var Eth = require('web3-eth');
// var Shh = require('web3-shh');
// var Bzz = require('web3-bzz');
var utils = require('web3-utils');
var Mc = require('../../chain3-mc')

var Chain3 = function Chain3() {
    var _this = this;

    // sets _requestmanager etc
    core.packageInit(this, arguments);

    this.version = version;
    this.utils = utils;

    this.mc = new Mc(this);
    // this.shh = new Shh(this);
    // this.bzz = new Bzz(this);

    // overwrite package setProvider
    var setProvider = this.setProvider;
    this.setProvider = function (provider, net) {
        setProvider.apply(_this, arguments);

        this.mc.setProvider(provider, net);
        // this.shh.setProvider(provider, net);
        // this.bzz.setProvider(provider);

        return true;
    };
};

Chain3.version = version;
Chain3.utils = utils;
Chain3.modules = {
    Mc: Mc,
    Net: Net,
    Personal: Personal
};

core.addProviders(Chain3);

module.exports = Chain3;

