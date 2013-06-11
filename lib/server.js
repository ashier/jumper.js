/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */


"use strict";

var express = require('express'),
    path = require('path'),
    RoutesValidator = require('./validator').RoutesValidator,
    db = require('./db'),
    app = express(),
    databaseSettings = {},
    projectDir = '',
    installedApps = [],
    middlewares = [];


module.exports = {

    databaseSettings: databaseSettings,
    projectDir: projectDir,
    installedApps: installedApps,
    middlewares: middlewares,
    routePatterns: [],
    version: '',

    parse: function(obj, use, callback) {
        // simplify
        var rawSettings = obj.settings;
        var guessedPath = process.env.JUMPER_DEV_PATH || path.join(__dirname, '..', '..', '..');

        // set values
        this.databaseSettings = rawSettings.databases;
        this.installedApps = rawSettings.installedApps;
        this.projectDir = rawSettings.projectDir || guessedPath;
        this.middlewares = rawSettings.middlewares;
        this.routePatterns = obj.routes.patterns;
        // Call Callback after parsing

        callback();
    },

    runServer: function(port, callback) {

        var that = this;

        // apply middlewares
        var env = process.env.NODE_ENV || 'development';

        try {
            that.middlewares[env].configure(app, express);
        } catch (err) {
            // mongoose.connection.close();
            callback(err);
            return;
        }

        // How to validate:
        //
        // 1. check routes & views
        // 2. validate models

        RoutesValidator.validate(app, express,
            that.routePatterns, that.projectDir, function(routeError) {

            if (routeError) {
                // mongoose.connection.close();
                callback(routeError);
                return;
            }

            // Start Server
            try {
                port = (process.env.PORT || (port || app.get('port')) || 3000);
                app.listen(port, function(err) {
                    if (err) {
                        callback(err);
                        return;
                    }

                    var date = new Date();
                    console.log('\n' + date.toDateString() + ' - ' + date.toTimeString());
                    console.log('\nJumper version ' + that.version);
                    console.log('Development server is running at http://localhost:' + port);
                    console.log('\nQuit the server with CONTROL-C.\n');

                    callback();
                });
                return;
            } catch (serverErr) {
                callback('Failed to run Express Server through Jumper. \nError Details :' + serverErr);
            }

        });

    },

    db: function() {
        return db;
    },

    dbConnect: function(projectPath, callback) {
        var that = this;
        db.initializeDatabase(that.databaseSettings, projectPath, function(err) {
            if (err) {
                return callback(err);
            }
        });
    }
};

