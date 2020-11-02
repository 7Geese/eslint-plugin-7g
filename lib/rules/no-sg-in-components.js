const { isJSXFilename } = require('../utils/filename.js');
const {
    isReactClass, isReactStatelessFn,
} = require('../utils/react.js');
const { isClass } = require('../utils/scope-types.js');


module.exports = function(context) {
    const report = (componentType = 'components') => (node) => context.report({
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
