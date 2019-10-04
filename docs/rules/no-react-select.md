## no-react-select
> _Prohibit usage of non-async ReactSelect directly in app code_

To reduce coupling of our app on the ReactSelect external library ReactSelect should not be used directly in app code. We have written a wrapper around it in 7g-components/Select that should be used instead, in order to maintain style consistency and make it easier to switch libraries.

However, as we have not written a replacement for Async this rule allows usages of ReactSelect.Async and { Async }


### Fail

The following patterns are considered warnings:

```jsx
import ReactSelect from "react-select";


() => {
    return (
        <ReactSelect />
    )
}
```

### Pass

The following patterns are **not** considered warnings:

```jsx
import ReactSelect from "react-select";
() => {
    return (
        <ReactSelect.Async />
    )
}
```
```jsx
import { Async } from "react-select";
() => {
    return (
        <Async />
    )
}
```

### Rule Configuration

Option ideas:
- 'async' - could be set to not allow Async
- 'component' - could be configured to allow in Select wrapper

```json
{
    "rules": {
        "7g/no-react-select": "error"
    }
}
```
