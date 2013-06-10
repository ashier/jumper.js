"use strict";

module.exports = function() {

    return {
        error: function(message, error) {
            if (typeof message !== 'undefined') {
                console.error('[ERROR]', message);
            }
            if (error) {
                throw error;
            }
        }
    };

}();
