import React, {createContext, useEffect, useState} from "react"
import "./index.css"
import {Slide} from "../slide/index";
import {Lines} from "../lines/index";

export const SliderContext = createContext({});

export const Slider = ({slides} : {slides: Array<any>}) => {
    let [number, setNumber] = useState(0)

    const changeSlide = (number: number) => {
        setNumber(number)
    }

    useEffect(()=>{
        setNumber(0)
    }, [])

    const getSlide = ()  => {
        return slides[number]
    }

    return (
        <div className="slider" >
            <Lines slideNumber={number} changeSlide={changeSlide}/>

            {getSlide()}


        </div>
    )
}
