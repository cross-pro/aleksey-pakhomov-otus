import React from "react"
import "./index.css"
import {useSelector} from "react-redux";
import {EditForm} from "../edit-form";

export const EditPresentation = () => {

    const presentationData = useSelector((state: any) => {
        return state.presentation
    });

    return (
        <div className="edit-presentation">
            {presentationData ? <EditForm
                _id={presentationData._id}
                presentation={presentationData}
            /> : null}
        </div>
    )
}
