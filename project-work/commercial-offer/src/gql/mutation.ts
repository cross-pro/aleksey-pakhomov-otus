import {gql} from "@apollo/client";

const UPDATE_PRESENTATION = gql`
    mutation updatePresentation(
        $_id: String!,
        $description: String!,
    )
    {
        updatePresentation(
            _id: $_id,
            description: $description
        )
        {
            _id,
        }
    }
`;

export {UPDATE_PRESENTATION}