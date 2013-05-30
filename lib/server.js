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
        Validators = require('./validators'),
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

        function applyMiddlewares(middlewares, errorCallback) {
            // // Middlewares

            var middlewaresLength = middlewares.length;

            try {
                for (var i = 0; i < middlewaresLength; i += 1) {
                    var item = middlewares[i];
                    switch (true) {
                        case (item.name.toString().indexOf("view") > -1):
                            app.set(item.name, item.value);
                            break;
                        case (item.name.toString().indexOf("express:") > -1):
                            var methodName = item.name.toString().split(':')[1];
                            if (methodName != 'router') {
                                if (!item.param) {
                                    app.use(express[methodName]());
                                } else if (item.value) {
                                    app.use(express[methodName](), item.value);
                                } else {
                                    app.use(express[methodName](item.param));
                                }
                            } else {
                                app.use(app.router);
                            }
                            break;
                        case (item.name.toString().indexOf("express.static") > -1):
                            var staticArr = item.name.toString().split(':');
                            if (staticArr.length > 1) {
                                app.use(staticArr[1], express.static(item.value));
                            } else {
                                app.use(express.static(item.value));
                            }
                            break;
                    }
                }
                return errorCallback();
            } catch (error) {
                return errorCallback("Failed to apply middlewares.\n" + error);
            }
        }

        return {
            defaultHTML: "<header><h1>It Worked</h1><p>Congratulations on your first powered Jumper-Powered page.</p></header>",
            database: database,
            projectDIR: projectDIR,
            environment: environment,
            databaseName: databaseName,
            installedApps: installedApps,
            middlewares: middlewares,
            urlPatterns:[],
            version: '',

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
                this.urlPatterns = obj.urls.URL_PATTERNS;
                // Call Callback after parsing
                callback();
            },

            runServer: function(port, errorCallback) {
                var that = this,
                    message;

                // ==========================================
                // Validate Models
                // ==========================================

                Validators.modelValidator({
                    dir: that.projectDIR,
                    apps: that.installedApps
                }, function(validationErrorMessage) {
                    if (!validationErrorMessage) {

                        // ==========================================
                        // Apply Default Routing
                        // ==========================================

                        if (that.urlPatterns.length === 0) {
                            app.get('/', function(req, res) {
                                res.send(that.defaultHTML);
                            });
                        }

                        // ==========================================
                        // Apply Middlewares
                        // ==========================================

                        applyMiddlewares(that.middlewares, function(middlewareErrorMessage) {

                            if (!middlewareErrorMessage) {

                                // ==========================================
                                // Start Server
                                // ==========================================

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
                                return errorCallback(middlewareErrorMessage);
                            }
                        });

                    } else {
                        return errorCallback(validationErrorMessage);
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
