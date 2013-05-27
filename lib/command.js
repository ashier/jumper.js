// ==========================================
// JUMPER
// PROGRAM
// ==========================================
// Copyright 2013 Ashier de Leon
// Licensed under the Apache License v2.0
// http://www.apache.org/licenses/LICENSE-2.0
// ==========================================

var command = (function() {

    'use strict';

    var program = require('commander'),
        path = require('path'),
        CORE = require('./core');

    return {
        initialize: function (obj) {

            program
                .version(require(path.join(__dirname, '..', 'package.json')).version)
                .option('-p, --port <port>', 'port to run express')
                .option('-u, --use <database>', 'database to use. default("default")');

            program
                .command('runserver')
                .action(function() {

                    // Initialize Core Properties
                    if (program.use) {
                        CORE.DATABASE = program.use;
                    }

                    CORE.DATABASES = obj.settings.DATABASES[CORE.DATABASE];
                    CORE.PORT = program.port;
                    CORE.URLS = obj.urls;
                    CORE.PROJECT_DIR = obj.settings.PROJECT_DIR;
                    CORE.ENV = obj.settings.ENV;
                    CORE.INSTALLED_APPS = obj.settings.INSTALLED_APPS;
                    CORE.SETTINGS = obj.settings.SETTINGS;
                    CORE.MIDDLEWARE = obj.settings.MIDDLEWARE;
                    CORE.STATIC_URL = obj.settings.STATIC_URL;
                    CORE.STATIC_DIRS = obj.settings.STATIC_DIRS;
                    CORE.MEDIA_URL = obj.settings.MEDIA_URL;
                    CORE.MEDIA_DIRS = obj.settings.MEDIA_DIRS;
                    CORE.TEMPLATE_DIRS = obj.settings.TEMPLATE_DIRS;
                    CORE.LOGGING = obj.settings.LOGGING;

                    // run server
                    CORE.runserver();
                });

            program
                .command('createapp <name>')
                .action(function(name) {
                    console.log('create app');
                });

            program
                .command('createproject <name>')
                .action(function(name) {
                    console.log('create project', name);
                });

            program
                .command('help')
                .action(function() {
                    console.log('help me....');
                });

            program.parse(process.argv);
        }
    };
}());

exports = module.exports = command;
