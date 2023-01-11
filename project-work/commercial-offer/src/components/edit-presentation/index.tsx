import React, {useEffect, useState} from "react"
import "./index.css"
import {useSelector} from "react-redux";

const editForm = (desc: string, slides: Array<any>) => {
    return (
        <div className="edit-form">
            <div className="input-group">
                <input type="text"
                       className="form-control"
                       id="title"
                       placeholder="Введите название"
                       required
                       value={desc}
                />
                <button className="btn btn-primary btn-save">Сохранить</button>
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
            {presentation ? editForm(presentation.description, []) : null}
        </div>
    )
}
