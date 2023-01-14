import React from "react"
import "./index.css"
import {EditForm} from "../edit-form";
import IPresentations from "../../models/presentations";
import {useSelector} from "react-redux";

export const EditPresentation = () => {

    const presentation: IPresentations = useSelector((state: any) => {
        return state.presentation
    });

    return (
        <div className="edit-presentation">
            {presentation && <EditForm/> }
        </div>
    )
}
