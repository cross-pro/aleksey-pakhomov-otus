import React from "react"
import "./index.css"
import {useSelector} from "react-redux";

export const ArrowLeft = () => {

    const changeSlide = useSelector((state: any) => {
        return state.changeSlide
    });

    let slideNumber: number = useSelector((state: any) => {
        return state.slideNumber
    })

    const goLeft = () => {
        if (slideNumber===0) return

        changeSlide(slideNumber-1)
    }

    return (
        <div className="arrow-left arrow" onClick={goLeft}>
            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                <path d="M10 3L6 8l4 5" stroke="currentColor" strokeWidth="2"></path>
            </svg>
        </div>
    )
}