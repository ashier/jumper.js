// ==========================================
// JUMPER
// CORE
// ==========================================
// Copyright 2013 Ashier de Leon
// Licensed under the Apache License v2.0
// http://www.apache.org/licenses/LICENSE-2.0
// ==========================================

(function() {

    "use strict";

    var server,
        report,
        version,
        contrib,
        middlewares;

    var JUMPER = function() {
        server = use_widget('server');
        report = use_widget('report');
        contrib = use_widget('contrib');
    };

    function use_widget(path) {
        return require("./" + path);
    }

    JUMPER.prototype = {
        constructor: JUMPER ,
        version: '',
        middlewares: middlewares,

        use: function(path) {
            return use_widget(path);
        },

        error: function(message) {
            report.error(message);
        },

        enable_command: function(obj) {
            var command = use_widget('command');
            command.initialize(obj);
        },

        parse: function(obj, use, callback) {
            if (server) {
                server.parse(obj, use, callback);
            }
        },

        run_server: function(port) {
            if (server) {
                server.version = this.version;
                server.run_server(port, function(error_message) {
                    report.error(error_message);
                });
            }
        },

        db_connect: function() {
            if (server) {
                server.db_connect(function(error_message) {
                    report.error(error_message);
                });
            }
        },

        contrib: function() {
            return contrib;
        },

        db: function() {
            return server.db();
        }
    };

    module.exports = JUMPER;

}());
