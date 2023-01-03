import React from "react"
import {SlideImage} from "../slide-image/index";
import {SlideTitle} from "../title/index";
import {SlideDescription} from "../description/index";
import "./index.css"

const Slider = () => {
    return (
        <div className="slider">
            <SlideTitle title="Косплей ведьмака"/>
            <SlideImage
                src={"https://webpulse.imgsmail.ru/imgpreview?mb=webpulse&key=pulse_cabinet-image-8f994035-fce9-4ec4-aa7f-134b39feb806"}
                alt={"картинка не найдена"}/>
            <SlideDescription description="Серия игр “Ведьмак” не была бы так хороша без Цириллы.
            Она появляется в третьей части и сразу же вызывает симпатию.
            Однако, книжная Цири могла бы понравиться геймерам не настолько сильно.
             Создатели игр хорошо поработали над этим персонажем, перечислим главные изменения."/>

        </div>
    )
}

export {Slider}