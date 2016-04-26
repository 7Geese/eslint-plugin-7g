"use strict";

var rule = require("../../../lib/rules/moment-utc"),
    RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
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
