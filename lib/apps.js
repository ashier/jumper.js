/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */

"use strict";

var _ = require('underscore'),
    path = require('path'),
    text = require('./utils/text'),
    routes = require('./validator').Routes,
    projectDirectory, map, installedApps,
    _app, _express, moduleRoutes;

function applyRoute(app, route, request, callback) {
    switch (request) {
        case 'get':
            app.get(route, callback);
            break;
        case 'post':
            app.post(route, callback);
            break;
        case 'put':
            app.put(route, callback);
            break;
        case 'delete':
            app.delete(route, callback);
            break;
    }
}

module.exports = {

    load: function(app, express) {
        _app = app;
        _express = express;
        return this;
    },

    fromInstalledApps: function(value) {
        installedApps = value;
        return this;
    },

    withMap: function(value) {
        map = value;
        return this;
    },

    atProjectDirectory: function(value) {
        projectDirectory = value;
        return this;
    },

    exec: function(callback) {
        var that = this;
        _.each(map, function(item) {
            if(!item.module) {
                var app = require(item._require);
                applyRoute(_app, item.route, item.request, app[item.method]);
            } else {
                var moduleDir = process.env.JUMPER_DEBUG_APPS ?
                    path.join(projectDirectory, '..', item._require.split('/')[0])
                    : path.join(projectDirectory, 'node_modules', item._require.split('/')[0]);
                var modulePath = path.join(moduleDir, 'lib', item._require.split('/')[1]);
                var routePatterns = require(modulePath).patterns;
                var modifiedPatterns = {};
                var moduleInstalledApps = [item.name];

                // Initialize Module
                require(moduleDir).init(_app, _express);

                _.each(routePatterns, function(value, key) {
                    var p = key.split(' ');
                    modifiedPatterns[text.removeTrailingSlash(p[0] + ' ' +
                        path.join(item.route, p[1]))] = value;
                });

                moduleRoutes = routes.validate(_app, _express)
                    .withRoutePatterns(modifiedPatterns)
                    .fromInstalledApps(moduleInstalledApps)
                    .atProjectDirectory(moduleDir)
                    .defaultRoute(true)
                    .exec(function(err, moduleMaps) {
                        if(err) {
                            return callback(err);
                        } else  {
                            that.load(_app, _express)
                                .withMap(moduleMaps)
                                .atProjectDirectory(moduleDir)
                                .fromInstalledApps(moduleInstalledApps)
                                .exec(function(err){
                                    if(err) {
                                        return callback(err);
                                    }
                                });
                        }
                    });
            }
        });
        callback();
    }
};
