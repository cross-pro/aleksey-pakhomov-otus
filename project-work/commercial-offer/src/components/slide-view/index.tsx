import React, {useState} from "react"
import "./index.css"
import ISlide from "../../models/slide";
import {useMutation, gql} from '@apollo/client';

export const SlideView = ({slide}: { slide: ISlide }) => {
    const UPDATE_SLIDE = gql`
        mutation updateSlide(
            $_id: String!,
            $title: String!,
            $imageUrl: String!,
            $description: String,
        )
        {
            updateSlide(_id: $_id,
                title: $title,
                imageUrl: $imageUrl,
                description: $description
            )
            {
                _id,
                title,
                imageUrl,
                description
            }
        }
    `;

    let [title, setTitle] = useState(slide.title)
    let [description, setDescription] = useState(slide.description)
    let [imageUrl, setImageUrl] = useState(slide.imageUrl)


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

    const saveForm = () => {
        updateSlide()
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
                >Сохранить
                </button>
            </div>
        </div>
    )
}