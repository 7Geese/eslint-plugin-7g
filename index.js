

module.exports = {
    rules: {
        'no-classname-on-common-components': require('./rules/no-classname-on-common-components.js'),
        'redux-connect-filenames': require('./rules/redux-connect-filenames.js'),
    },
    configs: {
        recommended: {
            rules: {
                '7g/no-classname-on-common-components': 'warn',
                '7g/redux-connect-filenames': 'error',
            },
        },
    },
};
