// ==========================================
// JUMPER
// ROUTES VALIDATOR
// ==========================================
// Copyright 2013 Ashier de Leon
// Licensed under the Apache License v2.0
// http://www.apache.org/licenses/LICENSE-2.0
// ==========================================


(function() {

    'use strict';

    var path = require('path'),
        engines = require('consolidate'),
        views_validator = require('./views_validator');

    function use_default_route(app, express) {
        app.use('/templates', express.static(path.join(__dirname, '..', '/templates/')));
        app.get('/', function(req, res) {
            app.set('view engine', 'html');
            res.render(path.join(__dirname, '..', '/templates/default.html'));
        });
        return false;
    }

    module.exports = function() {
        return function(app, express, url_patterns, callback) {
            var that = this,
                has_root_route = false,
                len = url_patterns.length;

            app.engine('html', engines.hogan);

            if (len > 0) {
                for (var i = 0; i < len; i += 1) {
                    if (url_patterns[i].route === '/') {
                        has_root_route = true;
                    }
                    views_validator.validate(app, url_patterns[i]);
                }

                if (!has_root_route) {
                    // ==========================================
                    // no route was found, use a default route
                    // ==========================================

                    callback(use_default_route(app, express));
                } else {
                    callback();
                }
            } else {

                // ==========================================
                // since there is no route, use a default route
                // ==========================================

                callback(use_default_route(app, express));
            }
        };
    }();

}());
