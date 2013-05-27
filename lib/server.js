// ==========================================
// JUMPER
// SERVER
// ==========================================
// Copyright 2013 Ashier de Leon
// Licensed under the Apache License v2.0
// http://www.apache.org/licenses/LICENSE-2.0
// ==========================================

var server = (function() {

    "use strict";

    var express = require('express'),
        mongoose = require('mongoose'),
        util = require('util'),
        app = express(),
        DATABASE_URL;

    // initalize admin routes
    // var routes = require('./config/routes')(app);

    function initializeDatabase(settings) {
         DATABASE_URL = util.format(
                'mongodb://%s%s%s/%s',
                (settings.USER ?
                    util.format(
                        '%s:%s@',
                        settings.USER,
                        settings.PASSWORD
                        ) : ''
                ),
                settings.HOST,
                (settings.PORT ? ":" + settings.PORT : ''),
                settings.NAME
            );

        mongoose.connect(DATABASE_URL);
    }

    return {
        runserver: function(settings, port) {
            initializeDatabase(settings);
            port = process.env.PORT || (port  || 3000);
            app.listen(port,
                function() {
                    console.log(
                        'Express server listening on port ' + port
                    );
                }
            );
        },

        use: function () {

        },

        DATABASE_URL: DATABASE_URL
    };

}());

exports = module.exports = server;
