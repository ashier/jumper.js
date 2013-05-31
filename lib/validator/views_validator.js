// ==========================================
// JUMPER
// VIEW VALIDATOR
// ==========================================
// Copyright 2013 Ashier de Leon
// Licensed under the Apache License v2.0
// http://www.apache.org/licenses/LICENSE-2.0
// ==========================================


(function() {

    'use strict';

    var path = require('path');

    module.exports = function() {
        return {

            validate: function(path, callback) {

                // ==========================================
                // 1. Parse path "home.views.index"
                //      - a. Should have "home folder"
                //      - b. Should have "views.js" file inside the folder
                // 2. Locate and require "views.js"
                // 3. Validate the method "index"
                // ==========================================



            }
        };
    }();

}());

