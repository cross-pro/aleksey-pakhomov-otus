import React from "react"
import "./index.css"
import {useLazyQuery, gql} from "@apollo/client";
import IPresentations from "../../models/presentations";
import {useDispatch} from "react-redux";
import {PRESENTATION_SLIDE_QUERY} from "../../gql/guery";

export const Presentation = ({description, id}: { description: string, id: string }) => {

    const dispatch = useDispatch()

    const [loadExpenseStatus, {loading, error, data}] = useLazyQuery(PRESENTATION_SLIDE_QUERY, {
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