import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {Slider} from "../slider"

/*компонент получает данные по конкретному слайду и отображает слайдер*/
export const Offer = () => {

    let params = useParams()
    let [pageId, setPageId] = useState<string | null>(null)

    useEffect(() => {
        const {id} = params
        if (id !== undefined) {
            setPageId(id.toString())
            console.log("loaded id:", id)
        }
    }, [])


    return (
        <div className="offer">
            <Slider/>
        </div>
    )

}