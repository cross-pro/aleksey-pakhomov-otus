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

const UPDATE_SLIDE = gql`
    mutation updateSlide(
        $_id: String!,
        $title: String!,
        $imageUrl: String!,
        $description: String,
    )
    {
        updateSlide(_id: $_id,
            title: $title,
            imageUrl: $imageUrl,
            description: $description
        )
        {
            _id,
            title,
            imageUrl,
            description
        }
    }
`;

export {UPDATE_PRESENTATION, UPDATE_SLIDE}