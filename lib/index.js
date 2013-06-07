// ==========================================
// JUMPER
// INDEX: The root api definition
// ==========================================
// Copyright 2013 Ashier de Leon
// Licensed under the Apache License v2.0
// http://www.apache.org/licenses/LICENSE-2.0
// ==========================================

(function() {

    "use strict";

    var Jumper = require('./core');

    module.exports = function() {

        var JUMPER = new Jumper();

        return {
            program: function(obj) {
                JUMPER.enableCommand(obj);
            },

            contrib: JUMPER.contrib(),
            db: JUMPER.db()

        };
    }();

}());
