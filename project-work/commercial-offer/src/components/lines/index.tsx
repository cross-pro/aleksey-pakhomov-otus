import React from "react"
import "./index.css"
import {Line} from "../line/index";
import {ArrowLeft} from "../arrow-left/index";
import {ArrowStart} from "../arrow-start/index";
import {ArrowRight} from "../arrow-right/index";
import {ArrowEnd} from "../arrow-end/index";

export const Lines = ({slideNumber, slides}
                          : { slideNumber: number, slides: Array<JSX.Element> }) => {

    return (
        <div className="lines">
            <ArrowStart slideNumber={slideNumber} />
            <ArrowLeft slideNumber={slideNumber}/>

            {slides.map((slide, index) => {
                return <Line key={index} number={index} slideNumber={slideNumber}/>
            })}

            <ArrowRight slideNumber={slideNumber}/>
            <ArrowEnd slideSize={slides.length} slideNumber={slideNumber}/>
        </div>
    )
}
