## redux-connect-filenames
> _Enforce `-redux.jsx` suffix for Redux-connected files._

To keep Redux-connected component files clear and easy to find, we specify that they must end with `-redux.jsx`.

### Fail

The following filename patterns are considered warnings:

```
connected-but-not-fully.jsx
not-jsx-redux.js
redux-ish-but-disconnected.jsx
```

### Pass

The following filename patterns are **not** considered warnings:

```
very-connected-redux.jsx
much-connected-redux.jsx
```

### Rule Configuration


```json
{
    "rules": {
        "7g/redux-connect-filenames": "error",
    }
}
```
