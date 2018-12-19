## no-sg-in-components
> _Discourage usage of SG globals inside of React components._

In an attempt to make our components more pure/less reliant on global variables, we try to avoid using the `SG` global in our components. Instead, it is preferable to use the `SGProvider` HOC.

### Fail

The following patterns are considered warnings:

```jsx
//  some-component.jsx

import React from 'react';

class SomeComponent extends React.Component {
    render() {
        return (
            <div>{SG.user.getFullName()}</div>
        );
    }
}
```

```jsx
//  some-component.jsx

import React, { PureComponent } from 'react';

class SomeComponent extends PureComponent {
    render() {
        return (
            <div>{SG.user.getFullName()}</div>
        );
    }
}
```

```jsx
//  some-component.jsx

import React from 'react';

const SomeComponent = () => (
    <div>{SG.user.getFullName()}</div>
);
```

### Pass

The following patterns are **not** considered warnings:

```jsx
//  not-a-jsx-file.js
import React from 'react';

const SomeComponent = () => (
    <div>{SG.user.getFullName()}</div>
);
```

```jsx
//  some-component.jsx
import React from 'react';
import SGProvider from '7g-components-hoc/sg-provider/sg-provider.jsx';

const SomeComponent = ({ name }) => (
    <div>{name}</div>
);

export default SGProvider(
    (sg) => ({ name: SG.user.getFullName() })
)(SomeComponent);
```


### Rule Configuration

```json
{
    "rules": {
        "7g/no-sg-in-components": "error",
    }
}
```
