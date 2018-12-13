

module.exports = {
    rules: {
        'apollo-query-filenames': require('./rules/apollo-query-filenames.js'),
        'no-classname-on-common-components': require('./rules/no-classname-on-common-components.js'),
    },
    configs: {
        recommended: {
            rules: {
                '7g/apollo-query-filenames': 'error',
                '7g/no-classname-on-common-components': 'warn',
            },
        },
    },
};
