/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */

"use strict";

var routes = require('./validator').Routes,
  apps = require('./apps'),
  async = require('async'),
  routePatterns, mappedRoutes,
  installedApps, _app, _express,
  _maps, projectDir;

module.exports = {
  mapSettings: function(app, express) {
    _app = app;
    _express = express;
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

  atProjectDirectory: function(value) {
    projectDir = value;
    return this;
  },

  exec: function(callback) {
    async.series([
      function(callback) {
        mappedRoutes = routes.validate(_app, _express)
          .withRoutePatterns(routePatterns)
          .fromInstalledApps(installedApps)
          .atProjectDirectory(projectDir)
          .defaultRoute(true)
          .exec(function(err, maps) {
          if (err) {
            return callback(err);
          } else {
            _maps = maps;
            callback();
          }
        });
      },

      function(callback) {
        apps.load(_app, _express)
          .withMap(_maps)
          .atProjectDirectory(projectDir)
          .fromInstalledApps(installedApps)
          .exec(callback);
      }

    ], function(err) {
      if (err) {
        return callback(err);
      }
      callback();
    });
  }

};
