const { RuleTester } = require('eslint');

const rule = require('../redux-connect-filenames.js');


RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
    },
});

const ruleTester = new RuleTester();

ruleTester.run('redux-connect-filenames', rule, {
    valid: [
        {
            code: 'import { connect } from "react-redux";',
            filename: 'very-connected-redux.jsx',
        },
        {
            code: 'import { connect, combineReducers, createStore } from "react-redux";',
            filename: 'much-connected-redux.jsx',
        },
    ],
    invalid: [
        {
            code: 'import { connect } from "react-redux";',
            filename: 'connected-but-not-fully.jsx',
            errors: [{
                message: 'Filenames for Redux-connected components must end with "-redux.jsx"',
            }],
        },
        {
            code: 'import { connect } from "react-redux";',
            filename: 'not-jsx-redux.js',
            errors: [{
                message: 'Filenames for Redux-connected components must end with "-redux.jsx"',
            }],
        },
        {
            code: 'import { connect, combineReducers, createStore } from "react-redux";',
            filename: 'redux-ish-but-disconnected.jsx',
            errors: [{
                message: 'Filenames for Redux-connected components must end with "-redux.jsx"',
            }],
        },
    ],
});
