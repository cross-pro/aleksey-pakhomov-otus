import React from "react"
import "./index.css"
import {Line} from "../line/index";

export const Lines = ({slideNumber, changeSlide}: {slideNumber: number, changeSlide: any}) => {

    return (
        <div className="lines">
            <Line active={true} number={0} slideNumber={slideNumber} changeSlide={changeSlide}/>
            <Line active={false} number={1} slideNumber={slideNumber} changeSlide={changeSlide}/>
            <Line active={false} number={2} slideNumber={slideNumber} changeSlide={changeSlide}/>
            <Line active={false} number={3} slideNumber={slideNumber} changeSlide={changeSlide}/>
            <Line active={false} number={4} slideNumber={slideNumber} changeSlide={changeSlide}/>
        </div>
    )
}