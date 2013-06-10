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
    save: function() {
        console.log('save called');
    },
    find: function() {
        console.log('find called');
    },
    findOne: function() {
        console.log('findOne called');
    },
    update: function() {
        console.log('update called');
    },
    remove: function() {
        console.log('remove called');
    }
};
