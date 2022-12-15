import React from "react"
import "./index.css"
import {Link} from "react-router-dom"

export const CityRow = ({name, name_en}) => {
    return (
        <div className="flex">
                <span className="city">
                    <Link to={name_en}>{name}</Link>
                </span>
        </div>
    )
}