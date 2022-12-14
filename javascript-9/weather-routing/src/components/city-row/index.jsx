import React from "react"
import "./index.css"

export const CityRow = ({name}) => {
    return (
        <div className="flex">
                <span className="city">{name}</span>

        </div>
    )
}