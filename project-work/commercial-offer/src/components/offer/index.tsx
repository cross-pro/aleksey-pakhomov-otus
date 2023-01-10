import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {Slider} from "../slider"
import {Slide} from "../slide";
import {useDispatch} from "react-redux";
import {gql, useLazyQuery} from "@apollo/client";
import {Loading} from "../loading/index";
import ISlide from "../../models/slide";
import {NotFound} from "../not-found";
import IPresentations from "../../models/presentations";

const SLIDES_QUERY = gql`
    query GetSlideById($slideId: String) {
        slidesById(slideId: $slideId) {
            description
            slides {
                imageUrl
                title
                description
            }
        }
    }
`;

/*компонент получает данные по конкретному слайду и отображает слайдер*/
export const Offer = () => {

    let params = useParams()
    const {id} = params
    let dataLoaded = false;

    let dispatch = useDispatch();

    let [loadData, setLoadData] = useState(true)
    let [dataFound, setDataFound] = useState(false)
    let [title, setTitle] = useState("")

    const [loadExpenseStatus, {loading, error, data}] = useLazyQuery(SLIDES_QUERY, {
        variables: {
            slideId: id
        }
    });

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        console.log(id)
        loadExpenseStatus()
            .then((data: any) => {
                const result = data.data.slidesById[0] as IPresentations
                console.log(result)

                if (result.description) setTitle(result.description)

                let slideList : ISlide[] = result.slides

                if (slideList.length) setDataFound(true)
                const slides: Array<JSX.Element> = []
                slideList.map((element) => {
                    slides.push(<Slide title={element.title}
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
    } else if (!dataFound) {
        return (
            <NotFound/>
        )
    } else {
        return (
            <div className="offer">
                <Slider/>
            </div>
        )
    }

}
