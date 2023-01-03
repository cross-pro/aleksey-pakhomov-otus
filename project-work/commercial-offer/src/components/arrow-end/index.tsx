import React from "react"
import "./index.css"

export const ArrowEnd = ({slideSize, changeSlide, slideNumber}: { slideSize: number, changeSlide: any, slideNumber: number }) => {

    const goEnd = () => {
        if (slideSize === 0) return
        if (slideNumber === slideSize - 1) return
        changeSlide(slideSize - 1)
    }

    return (
        <div className="arrow arrow-end" onClick={goEnd}>
            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                <path stroke="currentColor" strokeWidth="2" d="M12 3v10M4 13l4-5-4-5"></path>
            </svg>
        </div>
    )
}