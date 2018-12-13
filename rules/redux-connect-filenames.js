module.exports = function (context) {
    return {
        ImportDeclaration(node) {
            const { type, value } = node.source;
            const isLiteral = type === 'Literal';
            const isReactRedux = value === 'react-redux';
            const specifiers = node.specifiers.reduce((acc, spec) => acc.concat([spec.imported.name]), []);
            const isConnect = specifiers.includes('connect');

            if (isLiteral && isReactRedux && isConnect) {
                const fileName = context.getFilename();
                const isValidReduxFilename = /-redux.jsx$/.test(fileName);
                if (!isValidReduxFilename) {
                    context.report({
                        node,
                        message: 'Filenames for Redux-connected components must end with "-redux.jsx"',
                    });
                }
            }
        },
    };
};
module.schema = [];
