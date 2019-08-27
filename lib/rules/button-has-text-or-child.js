
module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'disallow using text and children at the same time on 7g buttons',
            category: 'Error',
            recommended: false,
        },
    },
    create(context) {
        return {
            JSXElement(node) {
                // if has children elements
                if (node.closingElement === null) {
                    return;
                }
                const openingEl = node.openingElement;
                if (openingEl && openingEl.name) {
                    const { name } = openingEl.name;
                    if (name !== 'Button') {
                        return;
                    }
                    if (!openingEl.attributes.length) {
                        return;
                    }
                    const props = openingEl.attributes.map(attr => attr.name.name);
                    const containsTextProp = props.includes('text');
                    if (containsTextProp) {
                        context.report(node, 'Cannot use both prop text and children on 7G button component');
                    }
                }
            },
        };
    },
};
