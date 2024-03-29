import React, {useEffect, useState} from "react"
import "./index.css"
import ISlide from "../../models/slide";
import {useLazyQuery, useMutation} from '@apollo/client';
import {UPDATE_SLIDE, ADD_SLIDE} from "../../gql/mutation";
import {PRESENTATION_SLIDE_QUERY} from "../../gql/guery";
import IPresentations from "../../models/presentations";
import {useDispatch} from "react-redux";

type Props = { slide: ISlide, addNew: boolean, presId: string }

export const Slide = ({slide, addNew, presId}: Props) => {

    const dispatch = useDispatch()

    let [title, setTitle] = useState(slide.title)
    let [description, setDescription] = useState(slide.description)
    let [imageUrl, setImageUrl] = useState(slide.imageUrl)

    useEffect(() => {
        if (slide) {
            setTitle(slide.title)
            setDescription(slide.description)
            setImageUrl(slide.imageUrl)
        }
    }, [slide])

    const changeTitle = (e: any) => {
        setTitle(e.target.value)
    }

    const changeDescription = (e: any) => {
        setDescription(e.target.value)
    }

    const changeImage = (e: any) => {
        setImageUrl(e.target.value)
    }

    const [updateSlide] = useMutation(UPDATE_SLIDE, {
        variables: {
            _id: slide._id,
            title: title,
            description: description,
            imageUrl: imageUrl
        }
    })

    const [addSlideToDB] = useMutation(ADD_SLIDE, {
        variables: {
            title: title,
            description: description,
            imageUrl: imageUrl,
            presId: presId
        }
    })

    const saveForm = () => {
        if (addNew) addSlide()
        else updateSlide()
    }

    const [loadExpenseStatus, {loading, error, data}] = useLazyQuery(PRESENTATION_SLIDE_QUERY, {
        fetchPolicy: "no-cache",
        variables: {
            id: presId
        }
    });

    const addSlide = () => {
        addSlideToDB().then(() => {
            loadExpenseStatus().then((data) => {
                const presentation = data.data.slidesById[0] as IPresentations

                dispatch({
                    type: "EDIT_PRESENTATION",
                    presentation: presentation
                })
            })
        })
    }

    return (
        <div className="slide-view">
            <label htmlFor={"title" + slide._id} className="col-sm-2 control-label">Заголовок</label>
            <div className="col-sm-10">
                <input id={"title" + slide._id} type="text" className="form-control" placeholder="Введите заголовок"
                       value={title} required onChange={changeTitle}/>
            </div>

            <label htmlFor={"imageUrl" + slide._id} className="col-sm-2 control-label">Изображение</label>
            <div className="col-sm-10">
                <input id={"imageUrl" + slide._id} type="text" className="form-control" placeholder="Изображение"
                       value={imageUrl} required onChange={changeImage}/>
            </div>

            <label htmlFor={"description" + slide._id} className="col-sm-2 control-label">Описание</label>
            <div className="col-sm-10">

                <input id={"description" + slide._id} type="text" className="form-control" placeholder="Описание"
                       value={description} required onChange={changeDescription}/>
            </div>

            <div className="col-sm-10">
                <button className="btn btn-primary"
                        onClick={saveForm}
                >{addNew ? "Добавить" : "Сохранить"}
                </button>
            </div>
        </div>
    )
}
