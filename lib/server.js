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
            staticURL = '',
            staticDIRs = [],
            mediaURL = '',
            mediaDIRs = [],
            templateDIRs = [],
            logging = {};

        return {

            database: database,
            projectDIR: projectDIR,
            environment: environment,
            databaseName: databaseName,
            installedApps: installedApps,
            settings: settings,
            middlewares: middlewares,
            staticURL: staticURL,
            staticDIRs: staticDIRs,
            mediaURL: mediaURL,
            mediaDIRs: mediaDIRs,
            templateDIRs: templateDIRs,
            logging: logging,

            parse: function(obj, use, callback) {
                // simplify
                var rawSettings = obj.settings;
                // set values
                this.databaseName = use || this.databaseName;
                this.database = rawSettings.DATABASES[this.databaseName];
                this.installedApps = rawSettings.INSTALLED_APPS;
                this.projectDIR = rawSettings.PROJECT_DIR;
                this.environment = rawSettings.ENV;
                this.settings = rawSettings.SETTINGS;
                this.middlewares = rawSettings.MIDDLEWARES;
                this.staticURL = rawSettings.STATIC_URL;
                this.staticDIRs = rawSettings.STATIC_DIRS;
                this.mediaURL = rawSettings.MEDIA_URL;
                this.mediaDIRs = rawSettings.MEDIA_DIRS;
                this.templateDIRs = rawSettings.TEMPLATE_DIRS;
                this.logging = rawSettings.LOGGING;
                // Call Callback after parsing
                callback();
            },

            runServer: function(port, errorCallback) {
                var message;
                port = process.env.PORT || (port || 3000);
                try {
                    app.listen(port, function() {
                        console.log(
                            'Express server listening on port ' + port);
                    });
                    return;
                } catch (err) {
                    message = "Failed to run Express Server through Jumper. \nError Details :" + err;
                }
                return errorCallback(message);
            },

            dbConnect: function(errorCallback) {
                var that = this,
                    message,
                    dbURL = buildDBUrl(that.database);

                try {
                    var db = mongoose.connect(dbURL);
                    return;
                } catch (err) {
                    message = "Connection to '" + dbURL + "' FAILED. Please check your DB credentials and try again.";
                }
                return errorCallback(message);
            }

        };
    }();

}());
