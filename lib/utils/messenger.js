/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */

"use strict";

module.exports = {
    error: function(message, error) {
        if (typeof message !== 'undefined') {
            console.error('[ERROR]', message);
        }
        if (error) {
            throw error;
        }
    }
};
