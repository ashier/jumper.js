/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */



"use strict";

var path = require('path'),
    fsutil = require('../utils/fs');

module.exports = {

    validate: function(app, urlPatterns, projectDir, currentViewEngine, callback) {

        // ==========================================
        // 0. Check urlPatterns if admin or not
        // 1. Parse path "home.views.index"
        //      - a. Should have "home folder"
        //      - b. Should have "views.js" file inside the folder
        // 2. Locate and require "views.js"
        // 3. Validate the method "index"
        // ==========================================

        var routes = urlPatterns.routes;
        var method = urlPatterns.method;
        var pathArr = urlPatterns.views.split('.');
        var dir = projectDir || path.join(__dirname, '..', '..');


        fsutil.checkIfFolderExist(dir)
            .exec(function(err) {
                if (err) {
                    callback('Failed to validate views.\n' + err);
                    return;
                }

                var view = require(path.join(dir, pathArr[0], (pathArr[1] + ".js")));
                if (view) {
                    if (view[pathArr[2]]) {
                        // apply view engine based on settings
                        if (currentViewEngine) {
                            app.set('view engine', currentViewEngine);
                        }

                        callback(false, app, routes.split(' ')[1], routes.split(' ')[0], view[pathArr[2]]);
                    } else {
                        callback('Failed to validate views.\n' +
                            pathArr[2] + ' is not a method.');
                    }
                } else {
                    callback('Failed to validate views.\n' +
                        pathArr[1] + ' is not a file.');
                }
            });

    }
};

