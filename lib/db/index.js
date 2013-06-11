/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */

"use strict";

var util = require('util'),
    DatabaseError = require('../error').Database,
    connection;

module.exports = {

    models: require('./models'),

    initializeDatabase: function(settings, projectPath, callback) {
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

            var database = require(projectPath + '/node_modules/' + settings.DATABASE),
                driver = require('./' + settings.DATABASE + '-driver');

            that.connection = driver;

            driver.connect(url, database, function(err) {
                if (err) {
                    callback(new DatabaseError('[ERROR] Failed to connect to database. \n\tDatabase Error: ' + err.errmsg));
                }
                driver.connected = true;
            });
        }

        callback(!hasDatabase, url);
    },

    connection: function() {
        return connection;
    }
};
