import React from "react"
import "./index.css"
import {useLazyQuery, gql} from "@apollo/client";
import IPresentations from "../../models/presentations";
import {useDispatch} from "react-redux";

export const Presentation = ({description, id}: { description: string, id: string }) => {

    const dispatch = useDispatch()

    const PRESENTATION_QUERY = gql`
        query GetPresentation($id: String){
            slidesById(slideId: $id) {
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

    const [loadExpenseStatus, {loading, error, data}] = useLazyQuery(PRESENTATION_QUERY, {
        variables: {
            id: id
        }
    });

    const onClick = () => {
        loadExpenseStatus().then((data) => {
            const presentation = data.data.slidesById[0] as IPresentations

            dispatch({
                type: "EDIT_PRESENTATION",
                presentation: presentation
            })
            console.log(presentation)

        })
    }

    return (
        <div onClick={onClick} className="presentation">
            {description}
        </div>
    )
}