"use strict";
var getProp = require('jsx-ast-utils/getProp');

var commonlyUsedComponents = [
    'Button',
    'ProfileImage',
    'Icon',
    'DotLoader',
    'ObjectiveName',
    'UserContentBlock',
    'RichTextInput',
];

module.exports = function(context) {
    return {
        JSXElement: function(node) {
            var name = node.openingElement.name.name
            if (commonlyUsedComponents.indexOf(name) === -1) {
                return;
            }
            var typeProp = getProp(node.openingElement.attributes, 'className');
            if (!typeProp) {
                return;
            }
            context.report(node, 'Avoid className prop on common component ' + name);
        }
    };
};

module.schema = [];
