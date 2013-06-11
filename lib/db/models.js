/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */


"use strict";

var _ = require('underscore');

module.exports = {
    Model: {

        STRING:'STRING',
        INTEGER:'INTEGER',
        DATE:'DATE',

        extend: function (model) {
            return _.extend(require('./model'), model);
        }

    }
};
