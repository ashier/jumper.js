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
    maps = require('./map'),
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
        var env = process.env.NODE_ENV || 'development';

        that.middlewares[env].configure(app, express);

        maps.mapSettings(app, express)
            .withRoutePatterns(that.routePatterns)
            .withProjectDirectory(that.projectDir)
            .fromInstalledApps(that.installedApps)
            .exec(function(err) {

            if (err) {
                db.close();
                return callback(err);
            }

            var date = new Date();
            console.log('\n' + date.toDateString() + ' - ' + date.toTimeString());
            console.log('\nJumper version ' + that.version);
            console.log('Development server is running at http://localhost:' + port);
            console.log('\nQuit the server with CONTROL-C.\n');

            callback();

        });
    },

    db: function() {
        return db;
    },

    dbConnect: function(projectPath, callback) {
        var that = this;
        db.initialize(that.databaseSettings)
            .withPath(projectPath)
            .exec(function(err) {
            if (err) {
                return callback(err);
            }
        });
    }
};
