const exampleQuery = `
import gql from 'graphql-tag';

export default {
    query: gql\`
    query myQuery {
        admins: profiles(first: 780, isAdmin: true, activationState: 1) {
            edges {
                node {
                    pk
                    fullName
                }
            }
        }
    }
    \`
}
`;

const exampleMutation = `
import gql from 'graphql-tag';

export default {
    mutation: gql\`
    mutation myMutation($enabled: Boolean!) {
        updateTalentIndicatorSettings(enabled: $enabled) {
            network {
                enableTalentIndicators
            }
        }
    }
    \`
}
`;

module.exports = {
    exampleQuery,
    exampleMutation,
};
