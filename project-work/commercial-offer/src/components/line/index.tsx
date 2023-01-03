import React from "react"
import "./index.css"

export const Line = ({active, number, slideNumber, changeSlide}
                         : { active: boolean, number: number, slideNumber: number, changeSlide: any }) => {

    const fireNumber = () => {
        changeSlide(number)
    }

    return (
        <div onClick={fireNumber} className={`line ${(slideNumber === number) ? "line-active" : ""}`}>
        </div>
    )
}