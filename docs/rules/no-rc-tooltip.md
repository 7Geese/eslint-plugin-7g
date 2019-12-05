## no-react-select
> _Prohibit usage of rc-tooltip in app code_

In an attempt to keep our tooltip consistent, let's promote the usage of 7g-components/tooltip/tooltip instead of using directly the rc-tooltip library.


### Fail

The following patterns are considered warnings:

```jsx
import ReactTooltip from "rc-tooltip";


() => {
    return (
        <ReactTooltip />
    )
}
```

### Pass

The following patterns are **not** considered warnings:

```jsx
import Tooltip from "7g-components/tooltip/tooltip.jsx";
() => {
    return (
        <Tooltip/>
    )
}
```
