/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
*/

(function() {

    "use strict";

    var express = require('express'),
        path = require('path'),
        validator = require('./validator'),
        db = require('./db'),
        app;

    module.exports = function() {

        // initiate express...
        app = express();

        // Initialize vars
        var databaseSettings = {},
            projectDir = '',
            environment = '',
            databaseName = 'default',
            installedApps = [],
            settings = [],
            middlewares = [],
            version = '';

        return {

            databaseSettings: databaseSettings,
            projectDir: projectDir,
            environment: environment,
            databaseName: databaseName,
            installedApps: installedApps,
            middlewares: middlewares,
            urlPatterns: [],
            version: '',

            parse: function(obj, use, callback) {
                // simplify
                var rawSettings = obj.settings;
                var guessedPath = path.join(__dirname, '..', '..', '..');

                // set values
                this.databaseName = use || this.databaseName;
                this.databaseSettings = rawSettings.DATABASES[this.databaseName];
                this.installedApps = rawSettings.INSTALLEDAPPS;
                this.projectDir = rawSettings.PROJECTDIR || guessedPath;
                this.environment = rawSettings.ENV;
                this.middlewares = rawSettings.MIDDLEWARES;
                this.urlPatterns = obj.urls.URL_PATTERNS;
                // Call Callback after parsing

                callback();
            },

            runServer: function(port, errorCallback) {

                var that = this,
                    message;

                // apply middlewares
                var env = process.env.NODE_ENV || 'development';
                try {
                    that.middlewares[env].configure(app, express);
                } catch (middleware_err) {
                    mongoose.connection.close();
                    errorCallback(middleware_err);
                    return;
                }

                // How to validate:
                //
                // 1. check routes & views
                // 2. validate models

                validator.validateRoutes(app, express, that.urlPatterns,
                    that.projectDir, function(routeError) {

                    if (routeError) {
                        mongoose.connection.close();
                        errorCallback(routeError);
                        return;
                    }

                    // Start Server
                    try {
                        port = (process.env.PORT || (port || app.get('port')) || 3000);
                        app.listen(port, function() {
                            var date = new Date();
                            console.log('\n' + date.toDateString() + ' - ' + date.toTimeString());
                            console.log('\nJumper version ' + that.version);
                            console.log('Development server is running at http://localhost:' + port);
                            console.log('\nQuit the server with CONTROL-C.\n');
                        });
                        return;
                    } catch (err) {
                        errorCallback('Failed to run Express Server through Jumper. \nError Details :' + err);
                    }

                });

            },

            db: function() {
                return db;
            },

            dbConnect: function(errorCallback) {
                var that = this;

                db.initializeDatabase(that.databaseSettings, function(err) {

                    if (err) {
                        console.info('WARNING: No valid database settings found.');
                        return;
                    }

                });
            }
        };
    }();

}());
