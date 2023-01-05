import React from "react"
import "./index.css"
import {Line} from "../line/index";
import {ArrowLeft} from "../arrow-left/index";
import {ArrowStart} from "../arrow-start/index";
import {ArrowRight} from "../arrow-right/index";
import {ArrowEnd} from "../arrow-end/index";
import {useSelector} from "react-redux";

export const Lines = ({slideNumber}
                          : { slideNumber: number}) => {

    const slides : Array<JSX.Element> = useSelector((state: any)=> {
        return state.slides
    })

    return (
        <div className="lines">
            <ArrowStart slideNumber={slideNumber} />
            <ArrowLeft slideNumber={slideNumber}/>

            {slides.map((slide, index) => {
                return <Line key={index} number={index} slideNumber={slideNumber}/>
            })}

            <ArrowRight slideNumber={slideNumber}/>
            <ArrowEnd slideNumber={slideNumber}/>
        </div>
    )
}
