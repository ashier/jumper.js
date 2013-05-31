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
        engines = require('consolidate'),
        Validators = require('./validators'),
        util = require('util'),
        path = require('path'),
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
            // default
            app.engine('html', engines.hogan);

            try {
                if (middlewares.length > 0) {
                    var env = process.env.NODE_ENV || 'development',
                        hasActiveMiddleware = false;

                    for (var i = 0; i < middlewares.length; i += 1) {
                        var item = middlewares[i];
                        if (item.env === env) {
                            hasActiveMiddleware = true;
                            // call configuration
                            item.configure(app, express);
                            break;
                        }
                    }

                    if (!hasActiveMiddleware) {
                        return errorCallback("Middlewares with env=" + env + " was not found.");
                    }

                } else {
                    return errorCallback("No Middlewares Found.");
                }
                return errorCallback();
            } catch (error) {
                return errorCallback("Failed to apply middlewares.\n" + error);
            }
        }

        return {
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
                        // Apply Middlewares
                        // ==========================================

                        applyMiddlewares(that.middlewares, function(middlewareErrorMessage) {

                            if (!middlewareErrorMessage) {

                                // ==========================================
                                // Apply Default Routing
                                // ==========================================

                                if (that.urlPatterns.length === 0) {

                                    app.use('/templates', express.static(path.join(__dirname, '/templates/')));

                                    app.get('/', function(req, res) {
                                        app.set('view engine', 'html');
                                        res.render(__dirname + '/templates/default.html');
                                    });

                                    app.get('/jade', function(req, res) {
                                        app.set('view engine', 'jade');
                                        res.render(__dirname + '/templates/default');
                                    });
                                }

                                // ==========================================
                                // Start Server
                                // ==========================================

                                try {
                                    port = (process.env.PORT || (port || app.get('port')) || 3000);
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
