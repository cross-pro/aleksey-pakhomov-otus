import React from "react"
import "./index.css"
import {useLazyQuery, gql} from "@apollo/client";

export const Presentation = ({description, id}: { description: string, id: string }) => {

    const PRESENTATION_QUERY = gql`
        query GetPresentation($id: String){
            slidesById(slideId: $id) {
                description
                slides {
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
        loadExpenseStatus().then((data)=>{
            const presentation = data.data.slidesById[0]
            console.log(presentation)
        })
    }

    return (
        <div onClick={onClick} className="presentation">
            {description}
        </div>
    )
}