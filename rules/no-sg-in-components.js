module.exports = function (context) {
    return {
        Identifier(node) {
            if (node.name === 'SG') {
                const { upper } = context.getScope();
                if (upper.type === 'class') {
                    const hasReactOrComponentInScope = upper.variableScope.variables.some(v => ['React', 'Component', 'PureComponent'].includes(v.name));
                    if (hasReactOrComponentInScope) {
                        context.report({
                            node,
                            message: 'Avoid using SG in components. Consider using SGProvider HOC instead.',
                        });
                    }
                }
            }
        },
    };
};
module.schema = [];
