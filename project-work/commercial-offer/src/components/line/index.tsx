import React from "react"
import "./index.css"
import {useSelector} from "react-redux";

export const Line = ({number}: { number: number }) => {

    let slideNumber: number = useSelector((state: any) => {
        return state.slideNumber
    })

    const changeSlide = useSelector((state: any) => {
        return state.changeSlide
    });

    const fireNumber = () => {
        changeSlide(number)
    }

    return (
        <div onClick={fireNumber} className={`line slide-button ${(slideNumber === number) ? "line-active" : ""}`}>
        </div>
    )
}