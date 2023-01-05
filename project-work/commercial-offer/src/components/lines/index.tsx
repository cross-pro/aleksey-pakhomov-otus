import React from "react"
import "./index.css"
import {Line} from "../line/index";
import {ArrowLeft} from "../arrow-left/index";
import {ArrowStart} from "../arrow-start/index";
import {ArrowRight} from "../arrow-right/index";
import {ArrowEnd} from "../arrow-end/index";
import {useSelector} from "react-redux";

export const Lines = ({slideNumber, slides}
                          : { slideNumber: number, slides: Array<JSX.Element> }) => {


    const changeSlide = useSelector((state: any) => {
        return state.changeSlide
    });

    return (
        <div className="lines">
            <ArrowStart slideNumber={slideNumber} changeSlide={changeSlide}/>
            <ArrowLeft slideNumber={slideNumber} changeSlide={changeSlide}/>

            {slides.map((slide, index) => {
                return <Line key={index} number={index} changeSlide={changeSlide} slideNumber={slideNumber}/>
            })}

            <ArrowRight slideNumber={slideNumber} changeSlide={changeSlide}/>
            <ArrowEnd changeSlide={changeSlide} slideSize={slides.length} slideNumber={slideNumber}/>
        </div>
    )
}