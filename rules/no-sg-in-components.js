module.exports = function (context) {
    const isClass = scope => scope.type === 'class';
    const isFunction = scope => scope.type === 'function';

    const reactComponentNames = ['Component', 'PureComponent'];

    const isReactClass = (classScope) => {
        if (!classScope || !classScope.block) {
            return false;
        }
        const { superClass } = classScope.block;
        if (!superClass) {
            return false;
        }

        if (superClass.type === 'MemberExpression') {
            if (superClass.object && superClass.object.name === 'React') {
                return true;
            }
        }
        if (superClass.type === 'Identifier') {
            if (reactComponentNames.includes(superClass.name)) {
                return true;
            }
        }
        return false;
    };

    const getReturnStatement = body => body.find(({ type }) => type === 'ReturnStatement');

    const isJSXElement = node => node.type === 'JSXElement';

    const isUpperScopeModule = scope => scope.upper.type === 'module';

    const getTopLevelFnScope = (scope) => {
        if (isUpperScopeModule(scope)) {
            return scope;
        }
        return getTopLevelFnScope(scope.upper);
    };

    const isReactStatelessFn = (scope) => {
        const upperFunctionScope = getTopLevelFnScope(scope);
        if (!upperFunctionScope || !upperFunctionScope.block.body) {
            return false;
        }
        const { body } = upperFunctionScope.block.body;
        if (!body) {
            return false;
        }
        const returnStatement = getReturnStatement(body);
        if (!returnStatement) {
            return false;
        }
        if (isJSXElement(returnStatement.argument)) {
            return true;
        }
        return false;
    };

    const report = node => context.report({
        node,
        message: 'Avoid using SG in components. Consider using SGProvider HOC instead.',
    });

    return {
        Identifier(node) {
            if (node.name === 'SG') {
                const scope = context.getScope();
                if (isClass(scope.upper)) {
                    if (isReactClass(scope.upper)) {
                        report(node);
                    }
                }
                if (isFunction(scope)) {
                    if (isReactStatelessFn(scope)) {
                        report(node);
                    }
                }
            }
        },
    };
};
module.schema = [];
