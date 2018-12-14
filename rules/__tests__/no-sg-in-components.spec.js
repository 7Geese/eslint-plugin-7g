const { RuleTester } = require('eslint');

const rule = require('../no-sg-in-components.js');

const { validExamples, invalidExamples } = require('./__fixtures__/no-sg-in-components.fixture.js');


RuleTester.setDefaultConfig({
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
});

RuleTester.it = function (text, method) {
    const readableTitle = text.replace(/\n/g, '\\n').slice(0, 25);
    const truncatedTestTitle = `${readableTitle}...`;
    return global.it(truncatedTestTitle, method);
};

const ruleTester = new RuleTester();

const mockError = {
    message: 'Avoid using SG in components. Consider using SGProvider HOC instead.',
};

ruleTester.run('no-sg-in-components', rule, {
    valid: [
        {
            code: 'import React from "react";',
        },
        {
            code: 'import React, { Component } from "react";',
        },
        {
            code: validExamples.marionetteClassUsingSG,
        },
        {
            code: validExamples.functionUsingSG,
        },
    ],
    invalid: [
        {
            code: invalidExamples.componentUsingSG,
            errors: [
                mockError,
                mockError,
                mockError,
            ],
        },
        {
            code: invalidExamples.functionComponentUsingSG,
            errors: [mockError],
        },
        {
            code: invalidExamples.moreComplexFunctionUsingSG,
            errors: [mockError, mockError],
        },
    ],
});
