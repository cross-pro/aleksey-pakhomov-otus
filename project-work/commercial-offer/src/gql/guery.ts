import {gql} from "@apollo/client";

const PRESENTATIONS_QUERY = gql`
    query GetPresentations  {
        presentations {
            _id
            description
        }
    }
`;

const PRESENTATION_SLIDE_QUERY = gql`
    query GetPresentation($id: String){
        slidesById(slideId: $id) {
            _id
            description
            slides {
                _id
                imageUrl
                title
                description
            }
        }
    }
`;

export {PRESENTATIONS_QUERY, PRESENTATION_SLIDE_QUERY}