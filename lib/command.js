// ==========================================
// JUMPER
// COMMAND
// ==========================================
// Copyright 2013 Ashier de Leon
// Licensed under the Apache License v2.0
// http://www.apache.org/licenses/LICENSE-2.0
// ==========================================

(function() {

    'use strict';

    var program = require('commander'),
        path = require('path'),
        Jumper = require('./core');

    module.exports = function() {

        var JUMPER = new Jumper();
        var version = require(path.join(__dirname, '..', 'package.json')).version;

        return {
            initialize: function(obj) {

                program
                    .version(version)
                    .option('-p, --port <port>', 'port to run express')
                    .option('-u, --use <database>', 'database to use. default("default")');

                program
                    .command('runserver')
                    .action(function() {
                    JUMPER.version = version;
                    JUMPER.parse(obj, program.use, function() {
                        JUMPER.dbConnect();
                        JUMPER.runServer(program.port);
                    });
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

                program.parse(process.argv);
            }
        };
    }();

}());