## no-classname-on-common-components
> _Enforce not adding `className` prop on our common components._

We don't want our common components to have `className` props on them, as this encourages us to override existing UI patterns with custom CSS. While this is necessary in some cases, it is preferred to simply wrap the component in a `div` or `span`, and then apply the class there.

Another common practice is to use `className` for `js-test` hooks. Again, just wrap the component in another element with that class on it.

### Fail

The following patterns are considered warnings:

```jsx
<Button
    className="js-test-my-button"
/>

// or...

<Icon
    className="my-icon"
/>
```

### Pass

The following patterns are **not** considered warnings:

```jsx
<div className="js-test-my-button">
    <Button  />
</div>

// or...

<span className="my-icon">
    <Icon />
</span>
```

### Rule Configuration

You are able to specify which components this rule applies to. If none are provided, this rule will never be applied.

```json
{
    "rules": {
        "7g/no-classname-on-common-components": ["error", {
            "components": [
                "Button",
                "ProfileImage",
                "DeprecatedIcon",
                "Icon",
                "DotLoader",
                "ObjectiveName",
                "UserContentBlock",
                "RichTextInput",
                "SortableContainer"
            ]
        }],
    }
}
```
