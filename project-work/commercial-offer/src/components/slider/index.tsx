import React, {useEffect, useState} from "react"
import "./index.css"
import {Lines} from "../lines/index";
import {useSelector} from "react-redux";

export const Slider = () => {
    let [number, setNumber] = useState(0)

    const slides = useSelector((state: any)=> {
        return state.slides
    })

    //TODO разобраться с нормальным переключение без таймаута
    const changeSlide = (number: number) => {
        if (number >= slides.length) return

        setHideClass("fade-in")
        setNumber(number)
        setTimeout(() => {
            setHideClass("")
        }, 1100)

    }

    let [hideClass, setHideClass] = useState("")

    useEffect(() => {
        setNumber(0)
    }, [])

    const getSlide = () => {
        return slides[number]
    }

    return (
        <div>
            <div className="slider">
                <Lines slides={slides} slideNumber={number} changeSlide={changeSlide}/>

                <div className={`slides ${hideClass}`}>
                    {getSlide()}
                </div>


            </div>

        </div>
    )
}
