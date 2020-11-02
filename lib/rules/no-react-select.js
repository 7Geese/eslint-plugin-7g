module.exports = function(context) {
    const report = (node) => context.report({
        node,
        message: `Avoid using non Async 'react-select' directly. Use 7g-components/Select instead.`,
    });

    let isImportingReactSelectAsyncDirectly = false;
    let localName;


    return {
        ImportDeclaration(node) {
            const {
                type, value,
            } = node.source;
            const [specifier] = node.specifiers;
            if (type === 'Literal' && value === 'react-select') {
                localName = specifier.local.name;
            }

            /*
                We don't want to fire in the following case
                import { Async } from 'react-select';
            */
            if (specifier && specifier.imported && specifier.imported.name === 'Async') {
                isImportingReactSelectAsyncDirectly = true;
            }
        },
        /*
            Will only fire in the case of
            <ReactSelect />
            Will not fire in the case of
            <ReactSelect.Async /> because name.type would === 'JSXMemberExpression'
        */
        JSXOpeningElement(node) {
            if (isImportingReactSelectAsyncDirectly) { return; }
            const { name } = node;
            if (name.type === 'JSXIdentifier' && name.name === localName) {
                report(node);
            }
        },
    };
};
module.schema = [];
