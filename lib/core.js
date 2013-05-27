// ==========================================
// JUMPER
// CORE
// ==========================================
// Copyright 2013 Ashier de Leon
// Licensed under the Apache License v2.0
// http://www.apache.org/licenses/LICENSE-2.0
// ==========================================

var JUMPER = (function() {

    "use strict";

    var server = require('./server');

    return {

        DATABASE: 'default',
        DATABASES: [],
        PORT: 3000,
        URLS: [],
        PROJECT_DIR: '',
        ENV: '',
        INSTALLED_APPS: [],
        SETTINGS: {},
        MIDDLEWARE: [],
        STATIC_URL: '',
        STATIC_DIRS: [],
        MEDIA_URL: '',
        MEDIA_DIRS: [],
        TEMPLATE_DIRS: [],
        LOGGING: {},

        runserver: function() {
            if (this.DATABASES) {
                server.runserver(this.DATABASES, this.PORT);
            } else {
                console.error("ERROR: No database setting with the name : " + this.DATABASE);
            }
        }
    };


}());

exports = module.exports = JUMPER;
