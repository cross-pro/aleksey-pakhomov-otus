import React from "react"
import "./index.css"
import {useSelector} from "react-redux";

export const ArrowStart = () => {

    const changeSlide = useSelector((state: any) => {
        return state.changeSlide
    });

    let slideNumber: number = useSelector((state: any) => {
        return state.slideNumber
    })

    const goStart = () => {
        if (slideNumber===0) return
        changeSlide(0)
    }

    return (
        <div className="arrow-start arrow" onClick={goStart}>
            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                <path d="M12 3L8 8l4 5M4 3v10" stroke="currentColor" strokeWidth="2"></path>
            </svg>
        </div>
    )
}