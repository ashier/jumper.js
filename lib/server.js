// ==========================================
// JUMPER
// SERVER
// ==========================================
// Copyright 2013 Ashier de Leon
// Licensed under the Apache License v2.0
// http://www.apache.org/licenses/LICENSE-2.0
// ==========================================

(function() {

    "use strict";

    var express = require('express'),
        mongoose = require('mongoose'),
        Validator = require('./validator'),
        util = require('util'),
        app;

    function buildDBUrl(settings) {
        return util.format(
            'mongodb://%s%s%s/%s', (settings.USER ?
            util.format(
            '%s:%s@',
            settings.USER,
            settings.PASSWORD) : ''),
            settings.HOST, (settings.PORT ? ":" + settings.PORT : ''),
            settings.NAME);
    }

    module.exports = function() {

        // initiate express...
        app = express();

        // Initialize vars
        var database = {},
            projectDIR = '',
            environment = '',
            databaseName = 'default',
            installedApps = [],
            settings = [],
            middlewares = [],
            version = '';

        return {

            database: database,
            projectDIR: projectDIR,
            environment: environment,
            databaseName: databaseName,
            installedApps: installedApps,
            middlewares: middlewares,
            version: '',

            appVersion: function(value) {
                this.version = value;
            },

            parse: function(obj, use, callback) {
                // simplify
                var rawSettings = obj.settings;
                // set values
                this.databaseName = use || this.databaseName;
                this.database = rawSettings.DATABASES[this.databaseName];
                this.installedApps = rawSettings.INSTALLED_APPS;
                this.projectDIR = rawSettings.PROJECT_DIR;
                this.environment = rawSettings.ENV;
                this.middlewares = rawSettings.MIDDLEWARES;
                // Call Callback after parsing
                callback();
            },

            runServer: function(port, errorCallback) {
                var that = this,
                    message;

                Validator.validateModels({
                    dir: that.projectDIR,
                    apps: that.installedApps,
                    middlewares: that.middlewares
                }, function(error) {
                    if (!error) {
                        try {
                            port = process.env.PORT || (port || 3000);
                            app.listen(port, function() {
                                var date = new Date();
                                console.log(date.toDateString() + ' - ' + date.toTimeString());
                                console.log('\nJumper version ' + that.version);
                                console.log('Development server is running at http://localhost:' + port);
                                console.log('Quit the server with CONTROL-C.');
                            });
                            return;
                        } catch (err) {
                            message = "Failed to run Express Server through Jumper. \nError Details :" + err;
                        }
                        return errorCallback(message);
                    } else {
                        return errorCallback(error);
                    }
                });
            },

            dbConnect: function(errorCallback) {
                var that = this,
                    message,
                    dbURL = buildDBUrl(that.database);

                mongoose.connect(dbURL);
                mongoose.connection.on('error', function(error) {
                    message = "Connection to '" + dbURL + "' FAILED.\n" + error;
                    return errorCallback(message);
                });
                return;
            }

        };
    }();

}());
