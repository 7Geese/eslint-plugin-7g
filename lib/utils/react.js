const { getModuleScope, getTopLevelFnScope } = require('./scope.js');
const {
    isReturnStatement,
    isIfStatement,
    isSwitchStatement,
    isJSXElement,
} = require('./node-types.js');


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
        if (superClass.name === 'Component' || superClass.name === 'PureComponent') {
            return true;
        }
    }
    return false;
};

const variablesIncludesReact = variables => variables.some(variable => variable.name === 'React');

const isReactInScope = (scope) => {
    if (!scope) {
        return false;
    }
    const moduleScope = getModuleScope(scope);
    if (!moduleScope) {
        return false;
    }
    return variablesIncludesReact(moduleScope.variables);
};

const hasJSXReturnStatements = (body) => {
    if (!body || !body.length) {
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

module.exports = {
    isReactClass,
    isReactInScope,
    isReactStatelessFn,
    hasJSXReturnStatements,
    variablesIncludesReact,
};
