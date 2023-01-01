import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"

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

    if (!pageId) {
        return (
            <div>Предложение не найдено</div>
        )
    }
    else {
        return (
            <div className="offer">
                <p>Предложение</p>
            </div>
        )
    }
}