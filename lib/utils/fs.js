"use strict";

var fs = require('fs'),
    async = require('async'),
    messenger = require('./messenger'),
    commands = [];


function doesFileExist(path) {
    return function(callback) {
        fs.stat(path, function(err, stats) {
            var errorMessage = '';
            if (err) {
                errorMessage = '\n' + path + ' does not exist.';
                messenger.error(errorMessage, err);
            } else {
                if (!stats.isFile()) {
                    errorMessage = '"' + path + '" is not a file.';
                    messenger.error(errorMessage);
                }
            }
            callback(errorMessage);
        });
    };
}

function doesFolderExist(path) {
    return function(callback) {
        fs.stat(path, function(err, stats) {
            var errorMessage = '';
            if (err) {
                errorMessage = '\n' + path + ' does not exist.';
                messenger.error(errorMessage, err);
            } else {
                if (!stats.isDirectory()) {
                    errorMessage = '"' + path + '" is not a folder.';
                    messenger.error(errorMessage);
                }
            }
            callback(errorMessage);
        });
    };
}

module.exports = {

    checkIfFileExist: function(path) {
        commands.push(doesFileExist(path));
        return this;
    },

    checkIfFolderExist: function(path) {
        commands.push(doesFolderExist(path));
        return this;
    },

    exec: function(callback) {

        async.parallel(commands, function(err) {

            // clear commands
            commands = [];

            if(err) {
                messenger.error();
                callback(err);
                return;
            }

            callback();
        });
    }

};
