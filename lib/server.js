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
        path = require('path'),
        validator = require('./validator'),
        db = require('./db'),
        app;

    module.exports = function() {

        // initiate express...
        app = express();

        // Initialize vars
        var database_settings = {},
            project_dir = '',
            environment = '',
            database_name = 'default',
            installed_apps = [],
            settings = [],
            middlewares = [],
            version = '';

        return {

            database_settings: database_settings,
            project_dir: project_dir,
            environment: environment,
            database_name: database_name,
            installed_apps: installed_apps,
            middlewares: middlewares,
            url_patterns: [],
            version: '',

            parse: function(obj, use, callback) {
                // simplify
                var raw_settings = obj.settings;
                // set values
                this.database_name = use || this.database_name;
                this.database_settings = raw_settings.DATABASES[this.database_name];
                this.installed_apps = raw_settings.INSTALLED_APPS;
                this.project_dir = raw_settings.PROJECT_DIR;
                this.environment = raw_settings.ENV;
                this.middlewares = raw_settings.MIDDLEWARES;
                this.url_patterns = obj.urls.URL_PATTERNS;
                // Call Callback after parsing
                callback();
            },

            run_server: function(port, error_callback) {

                var that = this,
                    message;

                // apply middlewares
                var env = process.env.NODE_ENV || 'development';
                try {
                    that.middlewares[env].configure(app, express);
                } catch(middleware_err) {
                    mongoose.connection.close();
                    error_callback(middleware_err);
                    return;
                }

                // How to validate:
                //
                // 1. check routes & views
                // 2. validate models

                validator.validate_routes(app, express, that.url_patterns,
                    that.project_dir, function(route_error) {

                    if (route_error) {
                        mongoose.connection.close();
                        error_callback(route_error);
                        return;
                    }

                    // ==========================================
                    // Start Server
                    // ==========================================

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
                        error_callback('Failed to run Express Server through Jumper. \nError Details :' + err);
                    }

                });

            },

            db: function() {
                return db;
            },

            db_connect: function(error_callback) {
                var that = this;

                db.initialize_database(that.database_settings, function(err) {

                    if (err) {
                        console.info('WARNING: No valid database settings found.');
                        return;
                    }

                });
            }
        };
    }();

}());
