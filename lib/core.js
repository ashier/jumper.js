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

    var server ,
        messenger;

    var JUMPER = function() {
        server = useWidget('server');
        messenger = useWidget('message');
    };

    function useWidget(path) {
        return require("./" + path);
    }

    JUMPER.prototype = {
        constructor: JUMPER ,

        use: function(path) {
            return useWidget(path);
        },

        showError: function(message) {
            messenger.showError(message);
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
                server.runServer(port, function(errorMessage) {
                    messenger.showError(errorMessage);
                });
            }
        },

        dbConnect: function() {
            if (server) {
                server.dbConnect(function(errorMessage) {
                    messenger.showError(errorMessage);
                });
            }
        }
    };

    module.exports = JUMPER;

}());
