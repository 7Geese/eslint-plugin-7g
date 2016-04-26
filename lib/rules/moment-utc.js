"use strict";

module.exports = function(context) {
    return {
        "CallExpression": function(node) {
            if(node.callee.name === "moment")  {
                var ancestors = context.getAncestors(node),
                    parent = ancestors.pop();
                if (!parent.property || parent.property.name !== 'utc') {
                    context.report(node, "Use moment.utc()");
                }
            }
        }
    };
};

module.schema = [];
