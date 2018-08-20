"use strict";

var rule = require("../../../lib/rules/no-classname-on-common-components"),
    RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true,
        },
    }
});
var ruleTester = new RuleTester();

ruleTester.run("no-classname-on-common-components", rule, {
    valid: [{
        code: '<ProfileImage imageUrl="test" />',
        options: [{ components: ['Icon'] }]
    }, {
        code: '<ProfileImage imageUrl="test" />',
    }, {
        code: '<ProfileImage imageUrl="test" />',
        options: [{ components: ['ProfileImage'] }]
    }, {
        code: '<button type="submit" />',
        options: [{ components: ['ProfileImage'] }]
    }],
    invalid: [{
        code: '<ProfileImage className="cool-class-name" />',
        options: [{ components: ['ProfileImage'] }],
        errors: [{ message: "Avoid className prop on common component ProfileImage"}]
    }]
});
