// ==========================================
// JUMPER
// DB
// ==========================================
// Copyright 2013 Ashier de Leon
// Licensed under the Apache License v2.0
// http://www.apache.org/licenses/LICENSE-2.0
// ==========================================

(function() {

    'use strict';

    var path = require('path'),
        util = require('util');

    module.exports = function() {

        function initialize_database(settings, callback) {

            var url = util.format(
                'mongodb://%s%s%s/%s', (settings.USER ?
                util.format(
                '%s:%s@',
                settings.USER,
                settings.PASSWORD) : ''),
                settings.HOST, (settings.PORT ? ":" + settings.PORT : ''),
                settings.NAME);

            var has_database = (settings.NAME !== '' && settings.HOST !== '');

            if (has_database) {

                // ==========================================
                //
                // ==========================================

                console.log('TODO: connect to database');
            }

            callback(!has_database, url);
        }

        return {
            Model: require('./model'),
            initialize_database: initialize_database
        };

    }();

}());
