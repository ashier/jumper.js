/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
*/

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
