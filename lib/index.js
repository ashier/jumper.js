/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */


"use strict";

var Jumper = require('./core');
var JUMPER = new Jumper();

module.exports = {

    contrib: JUMPER.contrib(),
    Model: JUMPER.db().models.Model,
    utils: JUMPER.utils(),

    start: function() {
        JUMPER.start();
    }

};


