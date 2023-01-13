import React, {useEffect, useState} from "react"
import "./index.css"
import {Slide} from "../slide-edit/index";
import {useMutation, useLazyQuery} from '@apollo/client';
import {UPDATE_PRESENTATION} from "../../gql/mutation"
import {PRESENTATIONS_QUERY} from "../../gql/guery";
import {useDispatch, useSelector} from "react-redux";
import IPresentations from "../../models/presentations";
import ISlide from "../../models/slide";

export const EditForm = () => {
    let [addMode, setAddMode] = useState(false);

    const emptySlide: ISlide = {
        title: "",
        description: "",
        imageUrl: ""
    }
    let [newSlide, setNewSlide] = useState(emptySlide)


    const presentation: IPresentations = useSelector((state: any) => {
        return state.presentation
    });

    useEffect(() => {
        setAddMode(false)
    }, [presentation])

    const dispatch = useDispatch()

    const [updatePresentation] = useMutation(UPDATE_PRESENTATION, {
        variables: {
            _id: presentation._id,
            description: presentation.description
        }
    })

    const [loadExpenseStatus, {loading, error, data}] = useLazyQuery(PRESENTATIONS_QUERY, {fetchPolicy: "no-cache"});


    const onChange = (e: any) => {
        const {value} = e.target

        let newPresentation = {...presentation}
        newPresentation.description = value

        dispatch({
            type: "EDIT_PRESENTATION",
            presentation: newPresentation
        })
    }

    const openInNewTab = (url: string) => {
        window.open(url, '_blank', 'noreferrer');
    };

    const watchResult = () => {
        let appAddress = window.location.href
        console.log(appAddress)
        openInNewTab(appAddress + "share/" + presentation._id)
    }

    const addSlide = () => {
        setAddMode(true)
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
                       value={presentation.description}
                       onChange={onChange}
                />
                <button className="btn btn-primary btn-save" onClick={savePresentation}>Сохранить</button>
                <button className="btn btn-primary btn-add" onClick={addSlide}>Добавить слайд</button>
                <button className="btn btn-primary btn-watch" onClick={watchResult}>Просмотр результата</button>
            </div>
            <hr/>

            <div className="slides">

                {
                    addMode && <Slide slide={newSlide} addNew={true}/>
                }
                {
                    presentation.slides && presentation.slides.map((slide, index) => {
                        return <Slide key={index} slide={slide} addNew={false}/>
                    })
                }
            </div>

        </div>
    )
}
