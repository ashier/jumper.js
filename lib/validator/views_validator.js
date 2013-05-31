// ==========================================
// JUMPER
// VIEW VALIDATOR
// ==========================================
// Copyright 2013 Ashier de Leon
// Licensed under the Apache License v2.0
// http://www.apache.org/licenses/LICENSE-2.0
// ==========================================


(function() {

    'use strict';

    var path = require('path'),
        fs = require('fs');

    module.exports = function() {
        return {

            validate: function(app, url_patterns, project_dir, current_view_engine, callback) {

                // ==========================================
                // 0. Check url_patterns if admin or not
                // 1. Parse path "home.views.index"
                //      - a. Should have "home folder"
                //      - b. Should have "views.js" file inside the folder
                // 2. Locate and require "views.js"
                // 3. Validate the method "index"
                // ==========================================

                var routes = url_patterns.route;
                var path_arr = url_patterns.views.split(".");
                var dir = project_dir || path.join(__dirname, '..', '..');

                fs.realpath(dir, function(err) {

                    if(err) {
                        callback("Failed to validate views.\n" + err);
                        return;
                    }

                    var folder = fs.lstatSync(path.join(dir, path_arr[0]));
                    if (folder.isDirectory()) {
                        var view = require(path.join(dir, path_arr[0], (path_arr[1] + ".js")));
                        if (view) {
                            if (view[path_arr[2]]) {

                                // apply view engine based on settings
                                console.log("current_view_engine > ", current_view_engine);
                                if (current_view_engine) {
                                    app.set('view engine', current_view_engine);
                                }

                                // route....
                                callback(false, app, routes, view[path_arr[2]]);
                            } else {
                                callback("Failed to validate views.\n" +
                                    path_arr[2] + " is not a method.");
                            }
                        } else {
                            callback("Failed to validate views.\n" +
                                    path_arr[1] + " is not a file.");
                        }
                        return;
                    } else {
                        callback("Failed to validate views.\n" +
                                 path_arr[0] + " is not a folder.");
                    }
                });
            }
        };
    }();

}());

