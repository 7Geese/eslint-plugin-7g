

module.exports = {
    rules: {
        'apollo-query-filenames': require('./lib/rules/apollo-query-filenames.js'),
        'no-classname-on-common-components': require('./lib/rules/no-classname-on-common-components.js'),
        'no-sg-in-components': require('./lib/rules/no-sg-in-components.js'),
        'redux-connect-filenames': require('./lib/rules/redux-connect-filenames.js'),
        'button-has-text-or-child': require('./lib/rules/button-has-text-or-child.js'),
        'no-react-select': require('./lib/rules/no-react-select.js'),
        'no-rc-tooltip': require('./lib/rules/no-rc-tooltip.js'),
    },
    configs: {
        recommended: {
            rules: {
                '7g/apollo-query-filenames': 'error',
                '7g/no-classname-on-common-components': 'warn',
                '7g/no-sg-in-components': 'warn',
                '7g/redux-connect-filenames': 'error',
                '7g/button-has-text-or-child': 'off',
                '7g/no-react-select': 'error',
                '7g/no-rc-tooltip': 'warn',
            },
        },
        on: {
            rules: {
                '7g/apollo-query-filenames': 'error',
                '7g/no-classname-on-common-components': 'error',
                '7g/no-sg-in-components': 'warn',
                '7g/redux-connect-filenames': 'error',
                '7g/button-has-text-or-child': 'warn',
                '7g/no-react-select': 'error',
                '7g/no-rc-tooltip': 'warn',
            },
        },
        off: {
            rules: {
                '7g/apollo-query-filenames': 'off',
                '7g/no-classname-on-common-components': 'off',
                '7g/no-sg-in-components': 'off',
                '7g/redux-connect-filenames': 'off',
                '7g/button-has-text-or-child': 'off',
                '7g/no-react-select': 'off',
                '7g/no-rc-tooltip': 'off',
            },
        },
    },
};
