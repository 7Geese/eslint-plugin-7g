

module.exports = {
    rules: {
        'apollo-query-filenames': require('./lib/rules/apollo-query-filenames.js'),
        'no-classname-on-common-components': require('./lib/rules/no-classname-on-common-components.js'),
        'no-sg-in-components': require('./lib/rules/no-sg-in-components.js'),
    },
    configs: {
        recommended: {
            rules: {
                '7g/apollo-query-filenames': 'error',
                '7g/no-classname-on-common-components': 'warn',
                '7g/no-sg-in-components': 'warn',
            },
        },
        on: {
            rules: {
                '7g/apollo-query-filenames': 'error',
                '7g/no-classname-on-common-components': 'error',
                '7g/no-sg-in-components': 'warn',
            },
        },
        off: {
            rules: {
                '7g/apollo-query-filenames': 'off',
                '7g/no-classname-on-common-components': 'off',
                '7g/no-sg-in-components': 'off',
            },
        },
    },
};
