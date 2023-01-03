import React, {createContext, useEffect, useState} from "react"
import "./index.css"
import {Lines} from "../lines/index";

export const SliderContext = createContext({});

export const Slider = ({slides} : {slides: Array<JSX.Element>}) => {
    let [number, setNumber] = useState(0)

    //TODO разобраться с нормальным переключение без таймаута
    const changeSlide = (number: number) => {
        setHideClass("fade-in")
        setNumber(number)
        setTimeout(()=>{
            setHideClass("")
        },1100)

    }



    let [hideClass, setHideClass] = useState("")

    useEffect(()=>{
        setNumber(0)
    }, [])

    const getSlide = ()  => {
        return slides[number]
    }

    return (
        <div className="slider" >
            <Lines slideNumber={number} changeSlide={changeSlide}/>

            <div className={`slides ${hideClass}`}>
                {getSlide()}
            </div>



        </div>
    )
}
