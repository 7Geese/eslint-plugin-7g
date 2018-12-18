const rule = require('../apollo-query-filenames.js');

const getRuleTester = require('./__rule-tester-config__.js');
const { exampleQuery, exampleMutation } = require('./__fixtures__/apollo-query-filename.fixture.js');


const ruleTester = getRuleTester({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
    },
});

ruleTester.run('apollo-query-filenames', rule, {
    valid: [
        {
            code: exampleQuery,
            filename: 'my-query.js',
        },
        {
            code: exampleMutation,
            filename: 'my-mutation.js',
        },
    ],
    invalid: [
        {
            code: exampleQuery,
            filename: 'my-uhh-i-forget-what-its-called.js',
            errors: [{
                message: 'Filename for Apollo queries must end with "-query.js"',
            }],
        },
        {
            code: exampleMutation,
            filename: 'my-uhh-thingy-that-sends-data.js',
            errors: [{
                message: 'Filename for Apollo mutations must end with "-mutation.js"',
            }],
        },
    ],
});
