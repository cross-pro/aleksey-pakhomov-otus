import React, {useEffect, useState} from "react"
import "./index.css"
import {SlideView} from "../slide-view/index";
import IPresentationList from "../../models/presentation-list";
import {Presentation} from "../presentation/index";

export const EditForm = ({desc, slides, _id}: { desc: string, slides: Array<any>, _id: string }) => {

    let [isEdit, setIsEdit] = useState(false);
    let [title, setTitle] = useState(desc)

    useEffect(() => {
        setTitle(desc)
    }, [desc])

    const onChange = (e: any) => {
        let value = e.target.value
        setTitle(value)
    }

    const openInNewTab = (url: string) => {
        window.open(url, '_blank', 'noreferrer');
    };

    const watchResult = () => {
        let appAddress = window.location.href
        console.log(appAddress)
        openInNewTab(appAddress+"share/"+_id)
    }

    const savePresentation = () => {

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
                <button className="btn btn-primary btn-save" onClick={savePresentation}>Сохранить</button>
                <button className="btn btn-primary btn-add">Добавить слайд</button>
                <button className="btn btn-primary btn-watch" onClick={watchResult}>Просмотр результата</button>
            </div>
            <hr/>

            <div className="slides">
                {
                    slides && slides.map((slide, index) => {
                        return <SlideView key={index} slide={slide}/>
                    })
                }
            </div>

        </div>
    )
}