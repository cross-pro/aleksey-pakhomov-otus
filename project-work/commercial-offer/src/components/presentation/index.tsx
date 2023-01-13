import React from "react"
import "./index.css"
import {useLazyQuery, gql} from "@apollo/client";
import IPresentations from "../../models/presentations";
import {useDispatch} from "react-redux";
import {PRESENTATION_SLIDE_QUERY} from "../../gql/guery";

type Props = { description: string, id: string }

export const Presentation = ({description, id}: Props) => {

    const dispatch = useDispatch()

    const [loadExpenseStatus, {loading, error, data}] = useLazyQuery(PRESENTATION_SLIDE_QUERY, {
        fetchPolicy: "no-cache",
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
        })
    }

    return (
        <div onClick={onClick} className="presentation">
            {description}
        </div>
    )
}