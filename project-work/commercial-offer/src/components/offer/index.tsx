import React from "react"
import {useParams} from "react-router-dom"
import {Slider} from "../slider"
import {Slide} from "../slide/index";

/*компонент получает данные по конкретному слайду и отображает слайдер*/
export const Offer = () => {

    return (
        <div className="offer">
            <Slider slides={loadSlides()}/>
        </div>
    )

}

const loadSlides = (): Array<JSX.Element> => {
    let params = useParams()
    const {id} = params
    console.log(id)
    let slides: Array<any> = []
    slides.push(
        <Slide title={"Косплей цири"}
               imageUrl="https://webpulse.imgsmail.ru/imgpreview?mb=webpulse&key=pulse_cabinet-image-8f994035-fce9-4ec4-aa7f-134b39feb806"
               description="Серия игр “Ведьмак” не была бы так хороша без Цириллы.
            Она появляется в третьей части и сразу же вызывает симпатию.
            Однако, книжная Цири могла бы понравиться геймерам не настолько сильно.
             Создатели игр хорошо поработали над этим персонажем, перечислим главные изменения."
               alt="Изображение не найдено"
        />)
    slides.push(<Slide title={"Косплей цири2"}
                       imageUrl="https://webpulse.imgsmail.ru/imgpreview?mb=webpulse&key=pulse_cabinet-image-8c79c8a8-a65d-49b1-97af-ac89842b58f9"
                       description="В игре Цирилла уверенная, ее больше не смущает шрам на лице, хотя он стал гораздо заметнее, чем в каноне. Она не переживает о своей внешности, носит открытую одежду и даже не думает себя с кем-то сравнивать."
                       alt="Изображение не найдено"
    />)

    return slides
}
