module.exports.isJSXFilename = (ctx) => {
    const filename = ctx.getFilename();
    //  Handles cases where code is passed directly to the rule (such as a test or ASTExplorer)
    if (filename === '<text>' || filename === '<input>') {
        return true;
    }
    if (/.jsx$/.test(filename)) {
        return true;
    }
    return false;
};
