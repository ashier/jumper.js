// ==========================================
// JUMPER
// MODEL
// ==========================================
// Copyright 2013 Ashier de Leon
// Licensed under the Apache License v2.0
// http://www.apache.org/licenses/LICENSE-2.0
// ==========================================

var model = (function() {
    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;

    return {
        Schema: function () {
            return Schema;
        },

        ObjectId: function () {
            return ObjectId;
        },

        useSchema: function (name, schema) {
            mongoose.model(name, schema);
        }
    };

}());

exports = module.exports = model;
