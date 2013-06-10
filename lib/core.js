/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */


"use strict";

var path = require('path'),
    async = require('async'),
    server, utils, fsutil,
    messenger, contrib,
    middlewares;


function useWidget(path) {
    return require("./" + path);
}

var JUMPER = function() {
    server = useWidget('server');
    utils = useWidget('utils');
    messenger = useWidget('utils/messenger');
    contrib = useWidget('contrib');
    fsutil = utils.fs;
};

JUMPER.prototype = {

    constructor: JUMPER,
    version: '',
    middlewares: middlewares,

    utils: function() {
        return utils;
    },

    start: function() {
        // fetch the client's settings & routes
        var that = this;
        var dir = path.join(__dirname, '..', '..', '..');
        var settings = path.join(dir, 'settings.js');
        var routes = path.join(dir, 'routes.js');

        fsutil.checkIfFileExist(settings)
            .checkIfFileExist(routes)
            .exec(function(err) {

            if (err) {
                messenger.error('Required files does not seem to exist.', err);
            } else {
                var command = useWidget('command');
                command.initialize(function(err, port, version, withDB) {
                    that.version = version;
                    async.parallel([
                        function(callback) {
                            that.parse({
                                settings: require(settings),
                                routes: require(routes)
                            },
                                withDB, callback);
                        },

                        function(callback) {
                            // connect to database here...
                            callback();
                        },

                        function(callback) {
                            that.runServer(port, callback);
                        }

                    ], function(err) {
                        if (err) {
                            messenger.error('Failed to start the server.', err);
                        }
                    });

                });
            }
        });
    },

    parse: function(obj, use, callback) {
        if (server) {
            server.parse(obj, use, callback);
        }
    },

    runServer: function(port, callback) {
        if (server) {
            server.version = this.version;
            server.runServer(port, function(err) {
                if (err) {
                    messenger.error(err);
                    callback(err);
                } else {
                    callback();
                }
            });
        }
    },

    dbConnect: function(callback) {
        if (server) {
            server.dbConnect(function(err) {
                if (err) {
                    callback(err);
                } else {
                    messenger.error(err);
                    callback();
                }
            });
        }
    },

    contrib: function() {
        return contrib;
    },

    db: function() {
        return server.db();
    }
};

module.exports = JUMPER;
