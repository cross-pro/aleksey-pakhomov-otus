import React from "react"
import {SlideTitle} from "../title/index";
import {SlideImage} from "../slide-image/index";
import {SlideDescription} from "../description/index";
import "./index.css"


export const Slide = ({title, imageUrl, description}:
                          { title: string, imageUrl: string, description: string }) => {

    const altText = "Изображение не найдено"
    return (
        <div className={`slide`}>
            <SlideTitle title={title}/>
            <SlideImage
                src={imageUrl}
                alt={altText}/>
            <SlideDescription description={description}/>
        </div>
    )
}