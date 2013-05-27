// ==========================================
// JUMPER
// INDEX: The root api definition
// ==========================================
// Copyright 2013 Ashier de Leon
// Licensed under the Apache License v2.0
// http://www.apache.org/licenses/LICENSE-2.0
// ==========================================


exports = module.exports = (function() {

    'use strict';

    var command = require('./command'),
        server = require('./server');

    return {

        program: function (obj) {
            command.initialize(obj);
        },

        DATABASE_URL: server.DATABASE_URL

    };

}());
