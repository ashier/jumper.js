/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */



"use strict";

var path = require('path'),
    text = require('../utils/text'),
    _ = require('underscore'),
    projectDirectory, projectPath,
    installedApps, list;


module.exports = {

    validate: function(path) {
        list = {};
        projectPath = path;
        return this;

    },

    fromInstalledApps: function(value) {
        installedApps = value;
        return this;
    },

    atProjectDirectory: function(value) {
        projectDirectory = value;
        return this;
    },

    exec: function(callback) {

        var paths = [], _projectPath = '';

        if (typeof projectPath === 'object') {
            _projectPath = projectPath.include;
        } else {
            _projectPath = projectPath;
        }

        if(_projectPath.indexOf('jumper.js-') > -1) {
            var split = _projectPath.split('jumper.js');
            var jmodule = split.toString().split('.')[0].toString().replace(',-', '');
            var splitj = _projectPath.split('jumper.js-' + jmodule + '.');
            var jfolder = '/node_modules/jumper.js-' + jmodule + '/lib';

            if (typeof splitj[1] !== 'undefined') {
                paths = [jfolder].concat(splitj[1].split('.'));
            } else {
                paths = [jfolder];
            }

        } else {
            paths = _projectPath.split('.');
        }

        var folder = text.parseFolderOnRoute(_projectPath);
        if (_.contains(installedApps, folder) === true) {
            var _require = (typeof paths[1] !== 'undefined') ?
                ((projectDirectory.indexOf(folder) == -1) ?
                    path.join(projectDirectory, paths[0], paths[1])
                    : path.join(projectDirectory, 'lib', paths[1]))
                : _projectPath;

            list = {
                    _require:_require,
                    method: paths[2] || '',
                    name: folder || '',
                    module: (typeof paths[1] === 'undefined'),
                };
        } else {
            if (typeof _projectPath !== 'object') {
                var message = '"' + folder + '" app does not exist. ' +
                    'Please check "installedApps" in your settings.js file and add "' +
                    folder + '" into the list.';
                callback(new require('../error').Validation(message));
            }
        }
        callback(null, list);
    }
};

