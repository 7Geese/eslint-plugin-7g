const rule = require("../../../lib/rules/moment-utc"),
    RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();
ruleTester.run("moment-utc", rule, {
    valid: [
        "moment.utc()",
        "moment().utc()"
    ],
    invalid: [
        {
            code: "moment()",
            errors: [{ message: "Use moment.utc()"}]
        }
    ]
});
