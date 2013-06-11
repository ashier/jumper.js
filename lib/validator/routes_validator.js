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
    Views = require('./views_validator');

function applyRoutes(err, app, route, method, callback) {

    if (err) {
        return console.log(err);
    }

    switch (method) {
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

function useDefaultRoute(app, express) {
    app.use('/_tmpl', express.static(path.join(__dirname, '..', '/templates/')));
    app.get('/', function(req, res) {
        app.set('view engine', 'jade');
        res.render(path.join(__dirname, '..', '/templates/default'));
    });
    return false;
}

module.exports = {
    validate: function(app, express, urlPatterns, installedApps, projectDir, callback) {

        var that = this;

        app.engine('html', engines.hogan);
        app.engine('jade', engines.jade);

        that.currentViewEngine = app.get('view engine');

        _.each(urlPatterns, function(path, fullRoute) {
            Views.validate(
                app, {
                    routes: fullRoute,
                    views: path
                },
                installedApps,
                projectDir,
                that.currentViewEngine,
                applyRoutes);
        });

        if (_.isEmpty(urlPatterns)) {
            // no route was found, use a default route
            callback(useDefaultRoute(app, express));
        } else {
            callback();
        }

    }
};
