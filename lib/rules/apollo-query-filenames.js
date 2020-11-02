const getLocForReport = (node) => {
    const { parent } = node;
    if (!parent || !parent.loc) {
        return {};
    }
    return {
        loc: parent.loc,
    };
};

const messages = {
    query: 'Filename for Apollo queries must end with "-query.js"',
    mutation: 'Filename for Apollo mutations must end with "-mutation.js"',
};

const getReport = (context) => (node, type) => {
    const loc = getLocForReport(node);
    return context.report({
        ...loc,
        node,
        message: messages[type],
    });
};


module.exports = function(context) {
    const fileName = context.getFilename();
    const report = getReport(context);
    const testFileName = (pattern) => pattern.test(fileName);
    const isValidQueryFilename = testFileName(/-query.js$/);
    const isValidMutationFilename = testFileName(/-mutation.js$/);
    let isImportingGql = false;

    return {
        ImportDeclaration(node) {
            const {
                type, value,
            } = node.source;
            if (type === 'Literal' && value === 'graphql-tag') {
                isImportingGql = true;
            }
        },
        ExportDefaultDeclaration(node) {
            if (isImportingGql) {
                const { declaration } = node;
                if (!declaration || !declaration.properties) {
                    return;
                }
                const propKeys = declaration.properties.map(({ key }) => key.name);
                if (propKeys.includes('query') && !isValidQueryFilename) {
                    report(node, 'query');
                }
                if (propKeys.includes('mutation') && !isValidMutationFilename) {
                    report(node, 'mutation');
                }
            }
        },
    };
};

module.schema = [];
