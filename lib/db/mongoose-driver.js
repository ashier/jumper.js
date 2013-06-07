// ==========================================
// JUMPER
// DB-MONGOOSE-DRIVER
// ==========================================
// Copyright 2013 Ashier de Leon
// Licensed under the Apache License v2.0
// http://www.apache.org/licenses/LICENSE-2.0
// ==========================================

(function() {

    "use strict";

    var EventEmitter = require('events').EventEmitter,
        util = require('util');

    var MongooseDriver = function() {

        var db;

        return {
            connected: false,

            connect: function(url, db, errorCallback) {
                var that = this;
                this.db = db;
                db.connect(url, function(err) {
                    if (err) {
                        errorCallback(err);
                    }
                    that.emit('connected');
                });
            },

            close: function() {
                db.connection.close();
            },

            on: function(event, listener) {
                var that = this;
                that.prototype.on(event, listener);
            },

            emit: function(event) {
                var that = this;
                that.prototype.emit(event);
            }
        };

    }();


    util.inherits(MongooseDriver, EventEmitter);
    module.exports = MongooseDriver;

}());
