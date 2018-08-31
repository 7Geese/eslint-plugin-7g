const rule = require("../../../lib/rules/favour-component"),
    RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true,
        },
    }
});
const ruleTester = new RuleTester();

ruleTester.run("favour-component", rule, {
    valid: [{
        code: '<ProfileImage imageUrl="test" />',
        options: [{ components: {Icon: 'Icon2'}}]
    }, {
        code: '<ProfileImage imageUrl="test" />',
    }],
    invalid: [{
        code: '<ProfileImage className="cool-class-name" />',
        options: [{ components: {ProfileImage: 'ProfileImage2'}}],
        errors: [{ message: "Please use ProfileImage2 instead of ProfileImage"}]
    }]
});
