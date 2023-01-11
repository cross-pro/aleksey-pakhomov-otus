import React, {useEffect, useState} from "react"
import "./index.css"

export const EditForm = ({desc, slides}: { desc: string, slides: Array<any> }) => {

    let [isEdit, setIsEdit] = useState(false);
    let [title, setTitle] = useState(desc)

    useEffect(()=>{
        setTitle(desc)
    },[desc])

    const onChange = (e: any) => {
        let value = e.target.value
        setTitle(value)
    }

    return (
        <div className="edit-form">
            <div className="input-group input-form">
                <input type="text"
                       className="form-control"
                       id="title"
                       placeholder="Введите название"
                       required
                       value={title}
                       onChange={onChange}
                />
                <button className="btn btn-primary btn-save">Сохранить</button>
                <button className="btn btn-primary btn-add">Добавить слайд</button>
                <button className="btn btn-primary btn-watch">Просмотр результата</button>
            </div>
            <hr/>


        </div>
    )
}