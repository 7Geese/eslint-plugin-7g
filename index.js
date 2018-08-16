'use strict';

module.exports = {
    rules: {
        'moment-utc': require('./lib/rules/moment-utc'),
        'no-classname-on-common-components': require('./lib/rules/no-classname-on-common-components')
    },
    configs: {
        recommended: {
            rules: {
                '7g/moment-utc': 1,
                '7g/no-classname-on-common-components': 1
            }
        }
    }
};
