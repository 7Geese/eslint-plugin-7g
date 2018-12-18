## apollo-query-filename
> _Enforce suffix for Apollo query and mutation files._

To keep Apollo-related files clear and easy to find, we specify that they must end with either `-query.js` or `-mutation.js` (depending on what type they are).

### Fail

The following patterns are considered warnings:

```jsx
//  some-dumb-filename.js
import gql from 'graphql-tag';


export default{
    query: gql`
    query myQuery {
        team(pk: 1) {
            pk
            name
        }
    }
    `;
}

//  filename-has-mutation-but-not-at-end.js
import gql from 'graphql-tag';


export default{
    mutation: gql`
    mutation myMutation {
        deleteTeam(pk: 1) {
            team {
                pk
            }
        }
    }
    `;
}
```

### Pass

The following patterns are **not** considered warnings:

```jsx
//  my-query.js
import gql from 'graphql-tag';


export default{
    query: gql`
    query myQuery {
        team(pk: 1) {
            pk
            name
        }
    }
    `;
}

//  my-mutation.js
import gql from 'graphql-tag';


export default{
    mutation: gql`
    mutation myMutation {
        deleteTeam(pk: 1) {
            team {
                pk
            }
        }
    }
    `;
}
```

### Rule Configuration

```json
{
    "rules": {
        "7g/apollo-query-filename": "error",
    }
}
```
