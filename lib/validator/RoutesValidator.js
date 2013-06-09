/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
*/


(function() {

    "use strict";

    var path = require('path'),
        engines = require('consolidate'),
        ViewsValidator = require('./ViewsValidator'),
        currentViewEngine;

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

    module.exports = function() {
        return {
            validateRoutes: function(app, express, urlPatterns, projectDir, callback) {

                var that = this,
                    hasRootRoute = false,
                    len = urlPatterns.length;

                app.engine('html', engines.hogan);
                app.engine('jade', engines.jade);

                that.currentViewEngine = app.get('view engine');

                if (len > 0) {

                    for (var i = 0; i < len; i += 1) {
                        if (urlPatterns[i].route === '/') {
                            hasRootRoute = true;
                        }
                        ViewsValidator.validate(
                            app,
                            urlPatterns[i],
                            projectDir,
                            that.currentViewEngine,
                            applyRoutes);
                    }

                    if (!hasRootRoute) {

                        // no route was found, use a default route
                        callback(useDefaultRoute(app, express));
                    } else {
                        callback();
                    }
                } else {

                    // Since there is no route, use a default route
                    callback(useDefaultRoute(app, express));
                }
            }
        };
    }();

}());
