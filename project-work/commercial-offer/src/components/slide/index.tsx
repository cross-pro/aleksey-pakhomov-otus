import React, {useEffect, useState} from "react"
import {SlideTitle} from "../title/index";
import {SlideImage} from "../slide-image/index";
import {SlideDescription} from "../description/index";
import "./index.css"


export const Slide = ({title, imageUrl, alt, description}:
                          { title: string, imageUrl: string, alt: string, description: string }) => {

    return (
        <div className={`slide`}>
            <SlideTitle title={title}/>
            <SlideImage
                src={imageUrl}
                alt={alt}/>
            <SlideDescription description={description}/>
        </div>
    )
}