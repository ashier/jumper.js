// ==========================================
// JUMPER
// VALIDATOR
// ==========================================
// Copyright 2013 Ashier de Leon
// Licensed under the Apache License v2.0
// http://www.apache.org/licenses/LICENSE-2.0
// ==========================================


(function() {

    'use strict';

    var fs = require('fs');

    module.exports = function() {

        return {
            validateModels: function(obj, callback) {

                console.log("Validating Models...");

                /*
                1. Check for installed apps and validate with directory
                2. Apply settings to express
                    - Apply middlewares to express
                    - Apply
                3. Check for urls
                    if there are urls
                        - validate route with corresponding view
                        - validate the view
                    if no urls
                        - generate '/' route to show installation is successful

                */

                return callback("Error validating models...");
            }
        };
    }();

}());
