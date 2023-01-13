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

const ADD_SLIDE = gql`
    mutation addSlide(
        $title: String!,
        $description: String,
        $imageUrl: String!,
        $presId: String!
    ){
        addSlide(title: $title,
            description: $description,
            imageUrl: $imageUrl,
            presId: $presId) {
            _id
            title
            description
            imageUrl
        }
    }
`;

const ADD_PRES = gql`
    mutation addPres(
        $description: String!,
    ){
        addPres(description: $description) {
            _id
            description
        }
    }
`;

export {UPDATE_PRESENTATION, UPDATE_SLIDE, ADD_SLIDE, ADD_PRES}
