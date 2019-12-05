const rule = require('../no-rc-tooltip.js');

const getRuleTester = require('./__rule-tester-config__.js');


const ruleTester = getRuleTester({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
    },
});

ruleTester.run('rc-tooltip', rule, {
    valid: [
        {
            code: `
                import Tooltip from "7g-components/tooltip/tooltip.jsx";
                () => {
                    return (
                        <Tooltip />
                    )
                }
            `,
        },
    ],
    invalid: [
        {
            code: `
                import ReactTooltip from "rc-tooltip";
                () => {
                    return (
                        <ReactTooltip />
                    )
                }
            `,
            errors: [{
                message: `Avoid using 'rc-tooltip' directly. Use Tooltip from 7g-components/tooltip/tooltip.jsx instead.`,
            }],
        },
    ],
});
