"use strict";
var getProp = require('jsx-ast-utils/getProp');

module.exports = function(context) {
    var options = context.options[0] || {components: []};
    return {
        JSXElement: function(node) {
            var name = node.openingElement.name.name
            if (options.components.indexOf(name) === -1) {
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
