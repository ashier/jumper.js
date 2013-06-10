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
