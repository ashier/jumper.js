/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */

"use strict";

var path = require('path'),
  _ = require('underscore'),
  engines = require('consolidate'),
  views = require('./views_validator'),
  installedApps, routePatterns, projectDirectory,
  enableDefaultRoute, _app, _express,
  viewMaps;

module.exports = {
  validate: function(app, express) {
    _app = app;
    _express = express;
    viewMaps = [];
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
    projectDirectory = value;
    return this;
  },

  defaultRoute: function(value) {
    enableDefaultRoute = value;
    return this;
  },

  exec: function(callback) {

    var templates = path.join(__dirname, '..', '/templates/');
    var statics = path.join(__dirname, '..', '/public/');
    var templatesDefault = path.join(__dirname, '..', '/templates/default');
    _app.engine('html', engines.hogan);
    _app.engine('jade', engines.jade);

    _.each(routePatterns, function(path, fullRoute) {
      var request = fullRoute.split(' ')[0];
      var route = fullRoute.split(' ')[1];

      views.validate(path)
        .atProjectDirectory(projectDirectory)
        .fromInstalledApps(installedApps)
        .exec(function(err, map) {
        if (err) {
          return callback(err);
        }
        map.request = request;
        map.route = route;
        viewMaps.push(map);
      });

    });

    if (_.isEmpty(routePatterns) === true && enableDefaultRoute) {
      _app.use('/jtmpl', _express.static(templates));
      _app.use('/jstatic/', _express.static(statics));
      _app.get('/', function(req, res) {
        _app.set('view engine', 'jade');
        res.render(templatesDefault);
      });
    }

    callback(null, viewMaps);
  }
};
