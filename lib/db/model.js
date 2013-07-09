/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */


"use strict";

var _ = require('underscore');

module.exports = {
  save: function(obj) {
    console.log('Model.save called', obj);
  },
  find: function() {
    console.log('Model.find called');
  },
  findOne: function() {
    console.log('Model.findOne called');
  },
  update: function() {
    console.log('Model.update called');
  },
  remove: function() {
    console.log('Model.remove called');
  },
  removeOne: function() {
    console.log('Model.removeOne called');
  }
};
