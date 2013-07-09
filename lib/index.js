/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */


"use strict";
var j = require('./core'),
  $ = new j();

module.exports = {
  Model: $.db().models.Model,
  utils: $.utils(),
  start: function() {
    $.start();
  }
};
