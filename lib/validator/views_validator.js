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
    fsutil = require('../utils/fs');


var parseUrlPatterns = function(views) {
    if (views.indexOf('jumper.js-') > -1) {
        var sj = views.split('jumper.js');
        var jmodule = sj.toString().split('.')[0].toString().replace(',-', '');
        var sjj = views.split('jumper.js-' + jmodule + '.');
        var path = process.env.JUMPER_DEBUG_ADMIN ? '../jumper.js-' + jmodule + '/lib'
                : '/node_modules/jumper.js-' + jmodule + '/lib';
        return [path].concat(sjj[1].split('.'));
    }
    return views.split('.');
};

var parseAppString = function(views) {
    if (views.indexOf('jumper.js-') > -1) {
        var sj = views.split('jumper.js');
        var jmodule = sj.toString().split('.')[0].toString().replace(',-', '');
        return 'jumper.js-' + jmodule;
    }
    return views.split('.')[0];
};

module.exports = {

    validate: function(app, urlPatterns, installedApps, projectDir, currentViewEngine, callback) {

        // ==========================================
        // 1. Parse path "home.views.index"
        //      - a. Should have "home folder"
        //      - b. Should have "views.js" file inside the folder
        // 2. Locate and require "views.js"
        // 3. Validate the method "index"
        // ==========================================

        var routes = urlPatterns.routes;
        var dir = projectDir || path.join(__dirname, '..', '..');
        var pathArr = parseUrlPatterns(urlPatterns.views);

        fsutil.checkIfFolderExist(dir)
            .exec(function(err) {
                if (err) {
                    callback('Failed to validate views.\n' + err);
                    return;
                }
                var appString = parseAppString(urlPatterns.views);
                if (_.contains(installedApps, appString) === true) {
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
                } else {
                    callback('"' + appString + '" app does not exist. Cannot route ' +
                        routes.split(' ')[1] + " to " + urlPatterns.views +
                        '. Please check "installedApps" in your settings.js file and add "' +
                        appString + '" into the list.');
                }
            });

    }
};

