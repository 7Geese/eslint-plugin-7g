

module.exports = {
    rules: {
        'no-classname-on-common-components': require('./rules/no-classname-on-common-components.js'),
        'no-sg-in-components': require('./rules/no-classname-on-common-components.js'),
    },
    configs: {
        recommended: {
            rules: {
                '7g/no-classname-on-common-components': 'warn',
                '7g/no-sg-in-components': 'warn',
            },
        },
    },
};
