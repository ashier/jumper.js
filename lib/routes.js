// ==========================================
// JUMPER
// ROUTES
// ==========================================
// Copyright 2013 Ashier de Leon
// Licensed under the Apache License v2.0
// http://www.apache.org/licenses/LICENSE-2.0
// ==========================================


var routes = (function() {
    'use strict';

    return {
        sayHello: function(){
            console.log("Hello from module");
        }
    };

}());

exports = module.exports = routes;
