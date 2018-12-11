'use strict';

module.exports = {
    rules: {
        'no-classname-on-common-components': require('./lib/rules/no-classname-on-common-components')
    },
    configs: {
        recommended: {
            rules: {
                '7g/no-classname-on-common-components': 1
            }
        }
    }
};
