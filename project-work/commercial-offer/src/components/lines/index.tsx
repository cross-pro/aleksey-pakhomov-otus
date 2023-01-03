import React from "react"
import "./index.css"
import {Line} from "../line/index";

export const Lines = () => {
    return (
        <div className="lines">
            <Line active={true}/>
            <Line active={false}/>
            <Line active={false}/>
            <Line active={false}/>
            <Line active={false}/>
        </div>
    )
}