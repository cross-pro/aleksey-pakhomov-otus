import React, {useEffect, useState} from "react"
import "./index.css"
import {useSelector} from "react-redux";

const editForm = (desc, slides) => {
    return (
        <div className="edit-form">
            <div className="form-group">
                <label htmlFor="title" >Название презентации:</label>
                <input type="text"
                       className="form-control"
                       id="title"
                       placeholder="Введите название"
                       required
                       value={desc}
                />
            </div>
            <hr/>
        </div>
    )
}

export const EditPresentation = () => {

    const presentationData = useSelector((state: any) => {
        return state.presentation
    });
    let [presentation, setPresentation] = useState(presentationData);

    useEffect(()=>{
        setPresentation(presentationData)
    },[])

    useEffect(()=>{
        setPresentation(presentationData)
    },[presentationData])

    return (
        <div className="edit-presentation">
            {presentation ? editForm(presentation.description, null) : null}
        </div>
    )
}
