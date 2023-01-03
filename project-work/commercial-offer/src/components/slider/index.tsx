import React, {createContext} from "react"
import "./index.css"
import {Slide} from "../slide/index";
import {Lines} from "../lines/index";

export const SliderContext = createContext({});

const Slider = () => {
    return (
        <div className="slider">
            <Lines/>
            <Slide/>


            <SliderContext.Provider
                value={{
                   /* goToSlide,
                    changeSlide,
                    slidesCount: items.length,
                    slideNumber: slide,
                    items,*/
                }}
            >

            </SliderContext.Provider>
        </div>
    )
}

export {Slider}