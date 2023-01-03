import React from "react"
import "./index.css"
import {Line} from "../line/index";
import {ArrowLeft} from "../arrow-left/index";
import {ArrowStart} from "../arrow-start/index";
import {ArrowRight} from "../arrow-right/index";
import {ArrowEnd} from "../arrow-end/index";

export const Lines = ({slideNumber, changeSlide}: {slideNumber: number, changeSlide: any}) => {

    return (
        <div className="lines">
            <ArrowStart />
            <ArrowLeft/>
            <Line active={true} number={0} slideNumber={slideNumber} changeSlide={changeSlide}/>
            <Line active={false} number={1} slideNumber={slideNumber} changeSlide={changeSlide}/>
            <Line active={false} number={2} slideNumber={slideNumber} changeSlide={changeSlide}/>
            <Line active={false} number={3} slideNumber={slideNumber} changeSlide={changeSlide}/>
            <Line active={false} number={4} slideNumber={slideNumber} changeSlide={changeSlide}/>
            <ArrowRight />
            <ArrowEnd />
        </div>
    )
}