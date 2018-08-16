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
    valid: [
        '<ProfileImage imageUrl="test" />',
        '<button type="submit" />'
    ],
    invalid: [
        {
            code: '<ProfileImage className="cool-class-name" />',
            errors: [{ message: "Avoid className prop on common component ProfileImage"}]
        }
    ]
});
