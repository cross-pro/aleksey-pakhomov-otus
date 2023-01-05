import React, {useEffect, useState} from "react"
import "./index.css"
import {Lines} from "../lines/index";
import {useDispatch, useSelector} from "react-redux";

export const Slider = () => {
    let [number, setNumber] = useState(0)

    let dispatch = useDispatch()


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

        dispatch({
            type: "CHANGE_SLIDE",
            changeSlide: changeSlide
        })

    }, [])

    useEffect(()=>{
        dispatch({
            type: "SLIDE_NUMBER",
            slideNumber: number
        })
    }, [number])

    const getSlide = () => {
        return slides[number]
    }

    return (
        <div>
            <div className="slider">
                <Lines />
                <div className={`slides ${hideClass}`}>
                    {getSlide()}
                </div>
            </div>
        </div>
    )
}
