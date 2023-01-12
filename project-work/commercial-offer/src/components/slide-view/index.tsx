import React from "react"
import "./index.css"
import ISlide from "../../models/slide";

export const SlideView = ({slide}: { slide: ISlide }) => {

    const saveForm = () => {
        console.log("save:", slide)
    }

    return (
        <div className="slide-view">
            <label htmlFor={"title" + slide._id} className="col-sm-2 control-label">Заголовок</label>
            <div className="col-sm-10">
                <input id={"title" + slide._id} type="text" className="form-control" placeholder="Введите заголовок"
                       defaultValue={slide.title} required/>
            </div>

            <label htmlFor={"imageUrl" + slide._id} className="col-sm-2 control-label">Изображение</label>
            <div className="col-sm-10">
                <input id={"imageUrl" + slide._id} type="text" className="form-control" placeholder="Изображение"
                       defaultValue={slide.imageUrl} required/>
            </div>

            <label htmlFor={"description" + slide._id} className="col-sm-2 control-label">Изображение</label>
            <div className="col-sm-10">

                <input id={"description" + slide._id} type="text" className="form-control" placeholder="Описание"
                       defaultValue={slide.description} required/>
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