const { RuleTester } = require('eslint');

const rule = require('../no-sg-in-components.js');


RuleTester.setDefaultConfig({
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
});

const ruleTester = new RuleTester();

const mockError = {
    message: 'Avoid using SG in components. Consider using SGProvider HOC instead.',
};

ruleTester.run('no-sg-in-components', rule, {
    valid: [
        {
            code: 'import { connect } from "react-redux";',
        },
        {
            code: 'import { connect, combineReducers, createStore } from "react-redux";',
        },
    ],
    invalid: [
        {
            code: `
import React, { Component } from 'react';


class SweetComponent extends Component {

        aMethod = () => {
            return SG.network.id;
        }

        //  SG is cool!
        someFunc() {
            return SG.network.isGutterFeatureActive('gutty');
        }

        render() {
            return SG.user.id;
        }
}
            `,
            errors: [
                mockError,
                mockError,
                mockError,
            ],
        },
    ],
});
