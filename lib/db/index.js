/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */

"use strict";

var util = require('util'),
    messenger = require('../utils/messenger'),
    connection;

module.exports = {

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
                settings.NAME);

        var hasDatabase = (settings.NAME !== '' && settings.HOST !== '');

        if (hasDatabase) {

            var database = require('../../../' + settings.DATABASE),
                driver = require('./' + settings.DATABASE + '-driver');

            that.connection = driver;

            driver.connect(url, database, function(err) {
                if (err) {
                    messenger.error(err);
                } else {
                    driver.connected = true;
                }
            });
        }

        callback(!hasDatabase, url);
    },

    connection: function() {
        console.log('connection');
        return connection;
    }
};
