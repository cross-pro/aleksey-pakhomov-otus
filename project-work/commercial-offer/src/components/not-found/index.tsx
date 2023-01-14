import React from "react"
import image from  "../../assets/dribble.gif"
import "./index.css"


export const NotFound = () => {
    return (
        <div className="page-not-found">
            <img src={image} alt="Страница не найдена" />
        </div>
    )
}