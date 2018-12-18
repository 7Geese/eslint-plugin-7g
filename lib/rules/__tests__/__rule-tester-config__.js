/* eslint-disable filenames/match-regex */
const { RuleTester } = require('eslint');


module.exports = (config) => {
    const defaultConfig = Object.assign({}, {
        parser: 'babel-eslint',
        parserOptions: {
            ecmaVersion: 2018,
            sourceType: 'module',
        },
    }, config);
    RuleTester.setDefaultConfig(defaultConfig);

    //  Truncate test names, otherwise it names the test the entire src code, which is messy
    RuleTester.it = function (text, method) {
        const readableTitle = text.replace(/\n/g, '\\n').slice(0, 25);
        const truncatedTestTitle = `${readableTitle}...`;
        return global.it(truncatedTestTitle, method);
    };

    const ruleTester = new RuleTester();
    return ruleTester;
};
