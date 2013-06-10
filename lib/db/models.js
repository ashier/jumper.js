/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */


"use strict";

module.exports = {
    Model: {

        STRING:'String',
        INTEGER:'int',
        DATE:'Date',

        create: function (model) {
            console.log('model > ', model);
            return model;
        }

    }
};
