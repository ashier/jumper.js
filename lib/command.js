/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */


"use strict";

var program = require('commander'),
    path = require('path'),
    version = require(path.join(__dirname, '..', 'package.json')).version;

module.exports = {

    initialize: function(callback) {

        program
            .version(version)
            .option('-p, --port <port>', 'port to run express')
            .option('-u, --use <database>', 'database to use. default("default")');

        program
            .command('runserver')
            .action(function() {
            callback(null, program.port, version, program.use);
        });

        program
            .command('startapp <name>')
            .action(function(name) {
            console.log('start app', name);
        });

        program
            .command('startproject <name>')
            .action(function(name) {
            console.log('start project', name);
        });

        program.parse(process.argv);

    }
};

