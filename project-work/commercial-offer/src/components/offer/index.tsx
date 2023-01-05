import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {Slider} from "../slider"
import {Slide} from "../slide";
import {useDispatch} from "react-redux";
import {useQuery, gql, useLazyQuery} from "@apollo/client";
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

    const altText = "Изображение не найдено"
    let params = useParams()
    const {id} = params

    let dataLoaded = false;

    let dispatch = useDispatch();

    let [loadData, setLoadData] = useState(true)

    const [loadExpenseStatus, {loading, error, data}] = useLazyQuery(SLIDES_QUERY);

    useEffect(() => {
        console.log(id)
        loadExpenseStatus()
            .then((data) => {
                const result = data.data.slides as ISlide[]
                console.log(result)
                const slides : Array<JSX.Element> = []
                result.map((element) => {
                    slides.push(<Slide title={element.title}
                                       alt={altText}
                                       description={element.description}
                                       imageUrl={element.imageUrl}
                    />)
                })

                dispatch({
                    type: "SLIDES",
                    slides: slides
                })

                dataLoaded = true
                setLoadData(false)
            })
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
