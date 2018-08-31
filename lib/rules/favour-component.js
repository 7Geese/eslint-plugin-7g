module.exports = function(context) {
    const options = context.options[0] || {components: {}};
    return {
        JSXElement: function(node) {
            const name = node.openingElement.name.name
            if (!options.components[name]) {
                return;
            }
            context.report(node, `Please use ${options.components[name]} instead of ${name}`);
        }
    };
};

module.schema = [];
