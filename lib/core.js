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
        server = useWidget('server');
        report = useWidget('report');
        contrib = useWidget('contrib');
    };

    function useWidget(path) {
        return require("./" + path);
    }

    JUMPER.prototype = {
        constructor: JUMPER ,
        version: '',
        middlewares: middlewares,

        use: function(path) {
            return useWidget(path);
        },

        error: function(message) {
            report.error(message);
        },

        enableCommand: function(obj) {
            var command = useWidget('command');
            command.initialize(obj);
        },

        parse: function(obj, use, callback) {
            if (server) {
                server.parse(obj, use, callback);
            }
        },

        runServer: function(port) {
            if (server) {
                server.version = this.version;
                server.runServer(port, function(errorMessage) {
                    report.error(errorMessage);
                });
            }
        },

        dbConnect: function() {
            if (server) {
                server.dbConnect(function(errorMessage) {
                    report.error(errorMessage);
                });
            }
        },

        contrib: function() {
            return contrib;
        }
    };

    module.exports = JUMPER;

}());
