/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */



"use strict";

var routePatterns,
    installedApps,
    projectDir;

module.exports = {
    mapSettings: function(app, express) {
        return this;
    },

    withRoutePatterns: function(value) {
        routePatterns = value;
        return this;
    },

    fromInstalledApps: function(value) {
        installedApps = value;
        return this;
    },

    withProjectDirectory: function(value) {
        projectDir = value;
        return this;
    },

    exec: function(callback) {
        console.log('mapping settings');
        // require('./routes_validator').validate(app, express, urlPatterns, installedApps, projectDir, callback);
    }

};

