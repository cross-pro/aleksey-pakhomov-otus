import React from "react"
import "./index.css"
import {useSelector} from "react-redux";

export const ArrowRight = ({slideNumber}: { slideNumber: number }) => {

    const changeSlide = useSelector((state: any) => {
        return state.changeSlide
    });

    const goRight = () => {
        changeSlide(slideNumber+1)
    }

    return (
        <div className="arrow arrow-start" onClick={goRight}>
            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                <path d="M6 13l4-5-4-5" stroke="currentColor" strokeWidth="2"></path>
            </svg>
        </div>
    )
}