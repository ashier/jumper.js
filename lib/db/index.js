// ==========================================
// JUMPER
// DB
// ==========================================
// Copyright 2013 Ashier de Leon
// Licensed under the Apache License v2.0
// http://www.apache.org/licenses/LICENSE-2.0
// ==========================================

(function() {

    "use strict";

    var path = require('path'),
        util = require('util'),
        report = require('../report');

    module.exports = function() {

        var connection;

        return {

            models: require('./models'),

            initializeDatabase: function(settings, callback) {
                var that = this,
                    url = util.format(
                            'mongodb://%s%s%s/%s', (settings.USER ?
                            util.format(
                            '%s:%s@',
                            settings.USER,
                            settings.PASSWORD) : ''),
                            settings.HOST, (settings.PORT ? ":" + settings.PORT : ''),
                            settings.NAME
                        ),
                    connection;

                var has_database = (settings.NAME !== '' && settings.HOST !== '');

                if (has_database) {

                    var database = require('../../../' + settings.DATABASE),
                        driver = require('./' + settings.DATABASE + '-driver');

                    that.connection = driver;

                    driver.connect(url, database, function(err) {
                        if (err) {
                            report.error(err);
                        } else {
                            driver.connected = true;
                        }
                    });
                }

                callback(!has_database, url);
            },

            connection: function() {
                return this.connection;
            }
        };
    }();
}());
