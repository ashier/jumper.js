/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */

"use strict";

var util = require('util');

exports.slugify = function (string) {
    return string.trim().replace(/\s+/g, '-').replace(/[^\w\-]/g, '').toLowerCase();
};

exports.removeTrailingSlash = function(string) {
    return string.replace(/\/+$/, "");
};

exports.parseFolderOnRoute = function(views) {
    if (typeof views !== 'object') {
        if (views.indexOf('jumper.js-') > -1) {
            var sj = views.split('jumper.js');
            var jmodule = sj.toString().split('.')[0].toString().replace(',-', '');
            return util.format('jumper.js-%s', (jmodule.indexOf('/') > -1 ? jmodule.split('/')[0] : jmodule)) ;
        }
        return views.split('.')[0];
    }
    return [];
};
