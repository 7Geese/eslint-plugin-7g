module.exports = function (context) {
    return {
        ImportDeclaration(node) {
            const { type, value } = node.source;
            if (!type || type !== 'Literal') {
                return null;
            }
            if (!value || value !== 'react-redux') {
                return null;
            }
            const isConnect = node.specifiers.some(spec => spec.imported.name === 'connect');
            if (isConnect) {
                const fileName = context.getFilename();
                const isValidReduxFilename = /-redux.jsx$/.test(fileName);
                if (!isValidReduxFilename) {
                    context.report({
                        node,
                        message: 'Filenames for Redux-connected components must end with "-redux.jsx"',
                    });
                }
            }
            return null;
        },
    };
};
module.schema = [];
