import React from "react"
import "./index.css"

export const Line = ({number, slideNumber, changeSlide}
                         : { number: number, slideNumber: number, changeSlide: any }) => {

    const fireNumber = () => {
        changeSlide(number)
    }

    return (
        <div onClick={fireNumber} className={`line slide-button ${(slideNumber === number) ? "line-active" : ""}`}>
        </div>
    )
}