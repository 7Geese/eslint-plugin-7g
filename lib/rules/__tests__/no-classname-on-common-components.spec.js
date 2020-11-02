const rule = require('../no-classname-on-common-components.js');

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
        code: '<ProfileImage imageUrl="test" />',
        options: [{ components: ['Icon'] }],
    }, {
        code: '<ProfileImage imageUrl="test" />',
    }, {
        code: '<ProfileImage imageUrl="test" />',
        options: [{ components: ['ProfileImage'] }],
    }, {
        code: '<button type="submit" />',
        options: [{ components: ['ProfileImage'] }],
    }],
    invalid: [{
        code: '<ProfileImage className="cool-class-name" />',
        options: [{ components: ['ProfileImage'] }],
        errors: [{ message: "Avoid className prop on common component ProfileImage" }],
    }],
});
