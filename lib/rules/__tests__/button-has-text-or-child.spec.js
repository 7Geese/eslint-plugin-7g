const rule = require('../button-has-text-or-child.js');

const getRuleTester = require('./__rule-tester-config__.js');


const ruleTester = getRuleTester({
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true,
        },
    },
});

ruleTester.run('no-classname-on-common-components', rule, {
    valid: [{
        code: '<Button text="Test" />',
    }, {
        code: '<Button>Test</Button>',
    }],
    invalid: [{
        code: '<Button text="Test">Test</Button>',
        errors: [{ message: 'Cannot use both prop text and children on 7G button component'}],
    }, {
        code: '<Button onClick={() => null} icon="arrow-down" text="Test">Test</Button>',
        errors: [{ message: 'Cannot use both prop text and children on 7G button component'}],
    }, {
        code: '<Button.Outline text="Test">Test</Button.Outline>',
        errors: [{ message: 'Cannot use both prop text and children on 7G button component'}],
    }],
});
