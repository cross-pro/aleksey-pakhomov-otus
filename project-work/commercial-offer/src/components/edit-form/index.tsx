import React, {useEffect, useState} from "react"
import "./index.css"
import {SlideView} from "../slide-view/index";
import {useMutation, useLazyQuery} from '@apollo/client';
import {UPDATE_PRESENTATION} from "../../gql/mutation"
import {PRESENTATIONS_QUERY} from "../../gql/guery";
import {useDispatch} from "react-redux";
import IPresentations from "../../models/presentations";

export const EditForm = ({_id, presentation}: { _id: string, presentation: IPresentations }) => {

    const dispatch = useDispatch()
    let [title, setTitle] = useState(presentation.description)

    const [updatePresentation] = useMutation(UPDATE_PRESENTATION, {
        variables: {
            _id: _id,
            description: title
        }
    })

    const [loadExpenseStatus, {loading, error, data}] = useLazyQuery(PRESENTATIONS_QUERY, {fetchPolicy: "no-cache"});

    useEffect(() => {
        setTitle(presentation.description)
    }, [presentation.description])

    const onChange = (e: any) => {
        const {value} = e.target
        setTitle(value)
    }

    const openInNewTab = (url: string) => {
        window.open(url, '_blank', 'noreferrer');
    };

    const watchResult = () => {
        let appAddress = window.location.href
        console.log(appAddress)
        openInNewTab(appAddress + "share/" + _id)
    }

    const savePresentation = () => {
        updatePresentation().then(() => {
            /*обновление списка презентаций после обновления имени элемента*/
            loadExpenseStatus().then((data) => {
                const listPres = data.data.presentations
                if (listPres && listPres.length > 0) {
                    dispatch({
                        type: "PRESENTATION_LIST",
                        presentationList: listPres
                    })
                }
            })
        })
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
                    presentation.slides && presentation.slides.map((slide, index) => {
                        return <SlideView key={index} slide={slide}/>
                    })
                }
            </div>

        </div>
    )
}