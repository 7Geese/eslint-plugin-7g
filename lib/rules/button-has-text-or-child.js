
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
                // if there is no closing element i.e. it is <Button /> then the rule doesn't apply
                if (node.closingElement === null) {
                    return;
                }
                const openingEl = node.openingElement;
                // check if the opening is a Button component
                if (openingEl && (openingEl.name || openingEl.tagName)) {
                    const name = getName(openingEl);
                    // if it's not a button the rule doesn't apply
                    if (name !== 'Button') {
                        return;
                    }
                    // if there are no props, the rule doesn't apply because there can't be a text prop
                    if (!openingEl.attributes.length) {
                        return;
                    }
                    const props = openingEl.attributes.map((attr) => {
                        return attr.name && attr.name.name
                            ? attr.name.name
                            : "";
                    });
                    const containsTextProp = props.includes('text');
                    if (containsTextProp) {
                        context.report(node, 'Cannot use both prop text and children on 7G button component');
                    }
                }
            },
        };
    },
};

const getName = function (element) { // The difference between Button and a sub type like Button.Minimal in the AST
    const { name } = element;
    return name.name || name.object.name;
};
