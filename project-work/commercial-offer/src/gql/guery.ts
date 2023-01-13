import {gql, useLazyQuery} from "@apollo/client";

const PRESENTATIONS_QUERY = gql`
    query GetPresentations  {
        presentations {
            _id
            description
        }
    }
`;

export {PRESENTATIONS_QUERY}