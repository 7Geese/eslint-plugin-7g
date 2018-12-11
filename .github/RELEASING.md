## Releasing

This is a guide for releasing this package to [NPM](https://www.npmjs.com/package/eslint-plugin-7g).

### How to release

First, make sure that you are:

1. Logged into `npm` in your shell (`npm login`).
2. Have 2fa setup on your NPM account.
3. Checked into `master` with no local changes/commits.

Now this:

```
npm run release
```

Don't use `yarn run`, as it does not handle NPM's 2fa.

This kicks off the [`np`](https://www.npmjs.com/package/np) program. It runs a series of checks, including:

- linting the JS code in this project
- running the Jest tests

You will be prompted for what version you want to bump to, and eventually you will need to enter your NPM one-time password.

### Versioning

When releasing, `np` will ask you about what version you would like to bump to.

**Major versions**

Only for major breaking changes, such as removing a rule. Could also be used for a breaking dependency bump.

**Minor versions**

Adding new rules, adding new config options to rules, or fixing issues with rules are all considered minor version bumps.

**Patch versions**

Minor typos or documentation fixes. Could also include minor package upgrades, as long as they are bug fix or documentation type updates.
