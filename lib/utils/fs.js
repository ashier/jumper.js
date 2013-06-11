/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */

"use strict";

var fs = require('fs'),
    async = require('async'),
    ApplicationError = require('../error'),
    error, commands = [];


function doesFileExist(path) {
    return function(callback) {
        fs.stat(path, function(err, stats) {
            var paths = path.split('/');
            if (err) {
                error = 'The file "' + paths[paths.length - 1] + '" does not exist.';
                return callback(new ApplicationError.File(error));
            } else {
                if (!stats.isFile()) {
                    error = '"' + paths[paths.length - 1] + '" is not a file.';
                    return callback(new ApplicationError.File(error));
                } else {
                    callback();
                }
            }
        });
    };
}

function doesFolderExist(path) {
    return function(callback) {
        fs.stat(path, function(err, stats) {
            var paths = path.split('/');
            if (err) {
                error = new ApplicationError.File('The folder "' + paths[paths.length - 1] + '" does not exist.');
                return callback(error);
            } else {
                if (!stats.isDirectory()) {
                    error = new ApplicationError.File('"' + paths[paths.length - 1] + '" is not a folder.');
                    return callback(error);
                } else {
                    callback();
                }
            }
        });
    };
}

module.exports = {
    fileExist: function(path) {
        commands.push(doesFileExist(path));
        return this;
    },

    folderExist: function(path) {
        commands.push(doesFolderExist(path));
        return this;
    },

    exec: function(callback) {
        async.parallel(commands, function(err) {
            // clear commands
            commands = [];
            if(err) {
                return callback(error || new ApplicationError.File('Unhandled Exception.'));
            }
            callback();
        });
    }

};
