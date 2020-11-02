const getProp = require('jsx-ast-utils/getProp');


module.exports = function(context) {
    const options = context.options[0] || { components: [] };
    return {
        JSXElement(node) {
            const { name } = node.openingElement.name;
            if (options.components.indexOf(name) === -1) {
                return;
            }
            const typeProp = getProp(node.openingElement.attributes, 'className');
            if (!typeProp) {
                return;
            }
            context.report(node, `Avoid className prop on common component ${name}`);
        },
    };
};

module.schema = [];
