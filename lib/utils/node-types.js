module.exports.isReturnStatement = node => node.type === 'ReturnStatement';
module.exports.isIfStatement = node => node.type === 'IfStatement';
module.exports.isSwitchStatement = node => node.type === 'SwitchStatement';
module.exports.isJSXElement = node => node.type === 'JSXElement' || node.type === 'JSXFragment';
