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
    ViewsValidator = require('./views_validator');

function applyRoutes(err, app, route, method, callback) {
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
    validate: function(app, express, urlPatterns, projectDir, callback) {

        var that = this,
            hasRootRoute = false;

        app.engine('html', engines.hogan);
        app.engine('jade', engines.jade);

        that.currentViewEngine = app.get('view engine');

        _.each(urlPatterns, function(path, route) {
            if (route.split(' ')[1] === '/') {
                hasRootRoute = true;
            }

            ViewsValidator.validate(
                    app,
                    {routes:route, views:path},
                    projectDir,
                    that.currentViewEngine,
                    applyRoutes);
        });

        if (!hasRootRoute) {
            // no route was found, use a default route
            callback(useDefaultRoute(app, express));
        } else {
            callback();
        }

    }
};
