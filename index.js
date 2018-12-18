

module.exports = {
    rules: {
        'apollo-query-filenames': require('./lib/rules/apollo-query-filenames.js'),
        'no-classname-on-common-components': require('./lib/rules/no-classname-on-common-components.js'),
        'no-sg-in-components': require('./lib/rules/no-sg-in-components.js'),
        'redux-connect-filenames': require('./lib/rules/redux-connect-filenames.js'),
    },
    configs: {
        recommended: {
            rules: {
                '7g/apollo-query-filenames': 'error',
                '7g/no-classname-on-common-components': 'warn',
                '7g/no-sg-in-components': 'warn',
                '7g/redux-connect-filenames': 'error',
            },
        },
        on: {
            rules: {
                '7g/apollo-query-filenames': 'error',
                '7g/no-classname-on-common-components': 'error',
                '7g/no-sg-in-components': 'warn',
                '7g/redux-connect-filenames': 'error',
            },
        },
        off: {
            rules: {
                '7g/apollo-query-filenames': 'off',
                '7g/no-classname-on-common-components': 'off',
                '7g/no-sg-in-components': 'off',
                '7g/redux-connect-filenames': 'off',
            },
        },
    },
};
