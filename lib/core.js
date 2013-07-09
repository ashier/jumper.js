/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */


"use strict";

var path = require('path'),
  async = require('async'),
  middlewares, utils,
  server, fsutil;


function useWidget(path) {
  return require("./" + path);
}

var JUMPER = function() {
  server = useWidget('server');
  utils = useWidget('utils');
  fsutil = utils.fs;
};

JUMPER.prototype = {

  constructor: JUMPER,
  version: '',
  middlewares: middlewares,

  utils: function() {
    return utils;
  },

  start: function() {
    var that = this;
    var dir = process.env.JUMPER_DEV_PATH ||
      path.join(__dirname, '..', '..', '..');
    var settings = path.join(dir, 'settings.js');
    var routes = path.join(dir, 'routes.js');

    fsutil.fileExist(settings)
      .fileExist(routes)
      .exec(function(err) {

      if (err) {
        return console.log(err);
      }

      var command = useWidget('command');
      command.initialize(function(err, port, version, withDB) {
        that.version = version;
        async.parallel([
          that.parse({
            settings: require(settings),
            routes: require(routes)
          }, withDB),

          that.dbConnect(dir),
          that.runServer(port)
        ], function(err) {
          if (err) return console.log(err.message);
        });
      });
    });
  },

  parse: function(obj, use) {
    return function(callback) {
      server.parse(obj, use, callback);
    };
  },

  runServer: function(port) {
    var that = this;
    return function(callback) {
      if (server) {
        server.version = that.version;
        server.runServer(that.port, function(err) {
          if (err) {
            return callback(err);
          }
          callback();
        });
      }
    };
  },

  dbConnect: function(projectPath) {
    return function(callback) {
      if (server) {
        server.dbConnect(projectPath, function(err) {
          if (err) {
            return callback(err);
          }
          callback();
        });
      }
    };
  },

  db: function() {
    return server.db();
  }
};

module.exports = JUMPER;
