import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {Slider} from "../slider"
import {Slide} from "../slide";
import {useDispatch} from "react-redux";
import {useQuery, gql} from "@apollo/client";
import {Loading} from "../loading/index";
import ISlide from "../../models/slide";

const SLIDES_QUERY = gql`
    {
        slides {
            title,
            imageUrl,
            description,
        }
    }
`;



/*компонент получает данные по конкретному слайду и отображает слайдер*/
export const Offer = () => {

    let params = useParams()
    const {id} = params
    console.log(id)

    let dispatch = useDispatch();

    let [loadData, setLoadData] = useState(true)

    //const {data, loading, error} = useQuery(SLIDES_QUERY);
    //console.log(data)
    //if (loading) return <Loading/>
    //if (error) return <pre>{error.message}</pre>

    //let result = data.slides as ISlide[]
    //console.log(result)

    useEffect(() => {
        console.log("useEffect")
        const slides = loadSlides()
        dispatch({
            type: "SLIDES",
            slides: slides
        })
        setLoadData(false)
    }, [])




    if (loadData) {
        return (
            <Loading/>
        )
    } else {
        return (
            <div className="offer">
                <Slider/>
            </div>
        )
    }

}

const loadSlides = () => {
    let slides: Array<JSX.Element> = []
    slides.push(
        <Slide title={"Косплей цири"}
               imageUrl="https://webpulse.imgsmail.ru/imgpreview?mb=webpulse&key=pulse_cabinet-image-8f994035-fce9-4ec4-aa7f-134b39feb806"
               description="Серия игр “Ведьмак” не была бы так хороша без Цириллы.
            Она появляется в третьей части и сразу же вызывает симпатию.
            Однако, книжная Цири могла бы понравиться геймерам не настолько сильно.
             Создатели игр хорошо поработали над этим персонажем, перечислим главные изменения."
               alt="Изображение не найдено"
        />)
    slides.push(<Slide title={"Косплей цири 2"}
                       imageUrl="https://webpulse.imgsmail.ru/imgpreview?mb=webpulse&key=pulse_cabinet-image-8c79c8a8-a65d-49b1-97af-ac89842b58f9"
                       description="В игре Цирилла уверенная, ее больше не смущает шрам на лице, хотя он стал гораздо заметнее, чем в каноне. Она не переживает о своей внешности, носит открытую одежду и даже не думает себя с кем-то сравнивать."
                       alt="Изображение не найдено"
    />)
    slides.push(<Slide title={"Косплей цири 3"}
                       imageUrl="https://webpulse.imgsmail.ru/imgpreview?mb=webpulse&key=pulse_cabinet-image-1ff82314-a524-49bf-8b4c-83dd84cd3a4f"
                       description="В книгах Анджея Сапковского Цирилла — неуверенная юная девушка с огромным количеством комплексов. Она очень стеснялась своего шрама и стремилась прикрыть его волосами. Цири постоянно сравнивала себя с другими и сильно завидовала."
                       alt="Изображение не найдено"
    />)
    slides.push(<Slide title={"Косплей цири 4"}
                       imageUrl="https://webpulse.imgsmail.ru/imgpreview?mb=webpulse&key=pulse_cabinet-image-56b79f2d-7d2b-4c3d-86ac-073a0b5d7dda"
                       description="Особенно сильно девушка из книг завидовала красотке Йеннифэр, которая заботилась о ней. Цири просто не могла слышать, как кто-то делает Йен очередной комплимент."
                       alt="Изображение не найдено"
    />)




    return slides;

}
