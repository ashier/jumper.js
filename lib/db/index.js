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
    _connection, _path, _settings;

module.exports = {

    models: require('./models'),

    initialize: function(value) {
        _settings = value;
        return this;
    },

    withPath: function(value) {
        _path = value;
        return this;
    },

    exec: function(callback) {
        var url = util.format(
            'mongodb://%s%s%s/%s', (_settings.USER ?
            util.format(
            '%s:%s@',
            _settings.USER,
            _settings.PASSWORD) : ''),
            _settings.HOST, (_settings.PORT ? ":" + _settings.PORT : ''),
            _settings.NAME);

        var hasDatabase = (_settings.NAME !== '' && _settings.HOST !== '');

        if (hasDatabase) {

            var database = require(_path + '/node_modules/' + _settings.DATABASE),
                driver = require('./' + _settings.DATABASE + '-driver');

            _connection = driver;

            driver.connect(url, database, function(err) {
                if (err) {
                    callback(new DatabaseError('[ERROR] Failed to connect to database. \n\tDatabase Error: ' + err.errmsg));
                }
                driver.connected = true;
            });
        }

        callback(!hasDatabase, url);
    },

    close: function() {
        return _connection.close();
    }
};
