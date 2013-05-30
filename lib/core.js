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
        contrib;

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

        use: function(path) {
            return useWidget(path);
        },

        reportError: function(message) {
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
                    message.reportError(errorMessage);
                });
            }
        },

        dbConnect: function() {
            if (server) {
                server.dbConnect(function(errorMessage) {
                    message.reportError(errorMessage);
                });
            }
        },

        contrib: function() {
            return contrib;
        }
    };

    module.exports = JUMPER;

}());
