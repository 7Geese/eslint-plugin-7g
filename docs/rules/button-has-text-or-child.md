## button-has-text-or-child
> _7Geese common component for buttons cannot have both children and a text prop at the same time._

Originally the button only supported use via children i.e.
```jsx
    <Button>Click me</Button>
```

Now we added the text prop to support translation via google translate.
You cannot use them at the same time.

### Fail

The following patterns are considered errors:

```jsx
<Button text="do not click me">
    Click me
</Button>
```

### Pass

The following patterns are **not** considered errors:

```jsx
<Button text="Click me" />
```

```jsx
<Button>
    Click me
</Button
```

### Rule Configuration

```json
{
    "rules": {
        "7g/button-has-text-or-child": true
    }
}
```
