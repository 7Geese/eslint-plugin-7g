const rule = require('../no-react-select.js');

const getRuleTester = require('./__rule-tester-config__.js');


const ruleTester = getRuleTester({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
    },
});

ruleTester.run('redux-connect-filenames', rule, {
    valid: [
        {
            code: `
                import { Async } from "react-select";
                () => {
                    return (
                        <Async />
                    )
                }
            `,
        },
        {
            code: `
                import ReactSelect from "react-select";
                () => {
                    return (
                        <ReactSelect.Async />
                    )
                }
            `,
        },
    ],
    invalid: [
        {
            code: `
                import ReactSelect from "react-select";
                () => {
                    return (
                        <ReactSelect />
                    )
                }
            `,
            errors: [{
                message: `Avoid using non Async 'react-select' directly. Use 7g-components/Select instead.`,
            }],
        },
    ],
});
