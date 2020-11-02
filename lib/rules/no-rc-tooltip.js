module.exports = function(context) {
    const report = (node) => context.report({
        node,
        message: `Avoid using 'rc-tooltip' directly. Use Tooltip from 7g-components/tooltip/tooltip.jsx instead.`,
    });

    let localName;


    return {
        ImportDeclaration(node) {
            const {
                type, value,
            } = node.source;
            const [specifier] = node.specifiers;
            if (type === 'Literal' && value === 'rc-tooltip') {
                localName = specifier.local.name;
            }
        },
        JSXOpeningElement(node) {
            const { name } = node;
            if (name.type === 'JSXIdentifier' && name.name === localName) {
                report(node);
            }
        },
    };
};
module.schema = [];
