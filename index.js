'use strict';

module.exports = {
    rules: {
        'moment-utc': require('./lib/rules/moment-utc')
    },
    configs: {
        recommended: {
            rules: {
                '7g/moment-utc': 1
            }
        }
    }
};
