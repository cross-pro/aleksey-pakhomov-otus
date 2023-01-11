import React, {useEffect, useState} from "react"
import "./index.css"
import {useSelector} from "react-redux";
import {EditForm} from "../edit-form/index";

export const EditPresentation = () => {

    const presentationData = useSelector((state: any) => {
        return state.presentation
    });
    let [presentation, setPresentation] = useState(presentationData);

    useEffect(() => {
        setPresentation(presentationData)
    }, [])

    useEffect(() => {
        setPresentation(presentationData)
    }, [presentationData])

    return (
        <div className="edit-presentation">
            {presentation ? <EditForm desc={presentation.description} slides={[]}/> : null}
        </div>
    )
}