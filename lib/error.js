/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */

"use strict";

var util = require('util');

var JumperError = function (msg, constr) {
    Error.captureStackTrace(this, constr || this);
    this.message = this.message + ': ' + msg || 'Error';
};

util.inherits(JumperError, Error);
JumperError.prototype.name = 'Error';


var FileError = function (msg) {
  FileError.super_.call(this, msg, this.constructor);
};

util.inherits(FileError, JumperError);
FileError.prototype.message = 'File Error';

var ServerError = function (msg) {
  ServerError.super_.call(this, msg, this.constructor);
};

util.inherits(ServerError, JumperError);
ServerError.prototype.message = 'Server Error';


var DatabaseError = function (msg) {
  DatabaseError.super_.call(this, msg, this.constructor);
};

util.inherits(DatabaseError, JumperError);
DatabaseError.prototype.message = 'Database Error';

var ValidationError = function (msg) {
  ValidationError.super_.call(this, msg, this.constructor);
};

util.inherits(ValidationError, JumperError);
ValidationError.prototype.message = 'Validation Error';


module.exports = {
    File: FileError,
    Server: ServerError,
    Database: DatabaseError,
    Validation: ValidationError
};
