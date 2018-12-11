## ESLint Plugin 7Geese
> _ESLint rules to help enforce coding style at [7Geese](https://github.com/7Geese)._


### Installation

Install ESLint either locally or globally.

```
yarn add eslint -D
```

Then you can install this plugin (also either locally or globally).

```
yarn add eslint-plugin-7g -D
```

### Rules

**no-classnames-on-common-components**

Discourage use of `className` on common components. Ideally, common components should not need to be re-styled.

Invalid:

```jsx
import Button from '7g-components/button/button.jsx'

const SomeButton = () => (
    <Button
        className="some-button"
    />
);
```

### Tests

```
yarn run test
```
