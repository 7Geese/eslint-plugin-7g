const rule = require('../no-sg-in-components.js');

const getRuleTester = require('./__rule-tester-config__.js');
const {
    validExamples, invalidExamples,
} = require('./__fixtures__/no-sg-in-components.fixture.js');


const ruleTester = getRuleTester({
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
});

const classComponentError = {
    message: 'Avoid using SG in class components. Use SGProvider HOC instead.',
};
const statelessError = {
    message: 'Avoid using SG in stateless components. Use SGProvider HOC instead.',
};

ruleTester.run('no-sg-in-components', rule, {
    valid: [
        {
            code: 'import React from "react";',
            filename: 'some-react-code.jsx',
        },
        {
            code: 'import React, { Component } from "react";',
            filename: 'some-react-code.jsx',
        },
        {
            code: validExamples.marionetteClassUsingSG,
            filename: 'marionette-with-some-react.jsx',
        },
        {
            code: validExamples.functionUsingSG,
            filename: 'some-function.jsx',
        },
        {
            code: invalidExamples.componentUsingSG,
            filename: 'invalid-but-not-a-jsx-file.js',
        },
    ],
    invalid: [
        {
            code: invalidExamples.componentUsingSG,
            filename: 'sweet-component.jsx',
            errors: [
                classComponentError,
                classComponentError,
                classComponentError,
            ],
        },
        {
            code: invalidExamples.functionComponentUsingSG,
            filename: 'sweeter-component.jsx',
            errors: [statelessError],
        },
        {
            code: invalidExamples.functionsWithConditionals,
            filename: 'sweeterer-component.jsx',
            errors: [statelessError, statelessError],
        },
        {
            code: invalidExamples.moreComplexFunctionUsingSG,
            filename: 'sweetest-component.jsx',
            errors: [statelessError, statelessError],
        },
    ],
});
