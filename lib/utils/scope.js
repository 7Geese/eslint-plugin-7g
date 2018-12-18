const { isModuleScope } = require('./scope-types.js');


const getTopLevelFnScope = (scope) => {
    if ((!scope || !scope.upper) || isModuleScope(scope.upper)) {
        return scope;
    }
    return getTopLevelFnScope(scope.upper);
};

const getModuleScope = (scope) => {
    if ((!scope || !scope.type) || isModuleScope(scope)) {
        return scope;
    }
    return getModuleScope(scope.upper);
};

module.exports = {
    getTopLevelFnScope,
    getModuleScope,
};
