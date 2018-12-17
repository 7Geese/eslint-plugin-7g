module.exports = function (context) {
    const isClass = scope => scope.type === 'class';

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

    const isReturnStatement = node => node.type === 'ReturnStatement';
    const isIfStatement = node => node.type === 'IfStatement';
    const isSwitchStatement = node => node.type === 'SwitchStatement';

    const hasJSXReturnStatements = (body) => {
        if (!body) {
            return false;
        }
        if (!Array.isArray(body) && isJSXElement(body)) {
            return true;
        }
        return body.reduce((hasJsxReturns, node) => {
            if (hasJsxReturns) {
                return hasJsxReturns;
            }
            if (isReturnStatement(node)) {
                return isJSXElement(node.argument);
            }
            if (isIfStatement(node) && (node.consequent && node.consequent.body)) {
                return hasJSXReturnStatements(node.consequent.body);
            }
            if (isSwitchStatement(node) && node.cases) {
                return node.cases.some((switchCase) => {
                    if (!switchCase || !switchCase.consequent) {
                        return false;
                    }
                    return switchCase.consequent.some(c => hasJSXReturnStatements(c.argument));
                });
            }
            return hasJsxReturns;
        }, false);
    };

    const isJSXElement = node => node.type === 'JSXElement' || node.type === 'JSXFragment';

    const isModuleScope = scope => scope.type === 'module';

    const getModuleScope = (scope) => {
        if (isModuleScope(scope)) {
            return scope;
        }
        return getModuleScope(scope.upper);
    };

    const getTopLevelFnScope = (scope) => {
        if (isModuleScope(scope.upper)) {
            return scope;
        }
        return getTopLevelFnScope(scope.upper);
    };

    const includesReact = variables => variables.some(variable => variable.name === 'React');

    const isReactInScope = (scope) => {
        const moduleScope = getModuleScope(scope);
        return includesReact(moduleScope.variables);
    };

    const isReactStatelessFn = (scope) => {
        const upperFunctionScope = getTopLevelFnScope(scope);
        if (!upperFunctionScope || !upperFunctionScope.block.body) {
            return false;
        }

        if (!isReactInScope(upperFunctionScope)) {
            return false;
        }

        const { body } = upperFunctionScope.block.body;
        if (!body) {
            return false;
        }

        if (hasJSXReturnStatements(body)) {
            return true;
        }

        return false;
    };

    const isJSXFilename = (ctx) => {
        const filename = ctx.getFilename();
        //  Handles cases where code is passed directly to the rule (such as a test or ASTExplorer)
        if (filename === '<text>' || filename === '<input>') {
            return true;
        }
        if (filename.endsWith('.jsx')) {
            return true;
        }
        return false;
    };

    const report = (componentType = 'components') => node => context.report({
        node,
        message: `Avoid using SG in ${componentType}. Use SGProvider HOC instead.`,
    });
    const reportClassComponent = report('class components');
    const reportFnComponent = report('stateless components');


    return {
        Identifier(node) {
            //  Early return if it's not a valid .jsx file (becasue React components only live in these files)
            if (!isJSXFilename(context)) {
                return;
            }
            if (node.name === 'SG') {
                const scope = context.getScope();
                if (isClass(scope.upper)) {
                    if (isReactClass(scope.upper)) {
                        reportClassComponent(node);
                    }
                }
                if (isReactStatelessFn(scope)) {
                    reportFnComponent(node);
                }
            }
        },
    };
};
module.schema = [];
