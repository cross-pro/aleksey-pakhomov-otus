import React, {useState} from "react"
import "./index.css"

export const Line = ({active} : {active: boolean}) => {
    let [activeClass] = useState("line-active")

    return (
        <div className={`line ${active ? activeClass : ""}`}>
            <span></span>
        </div>
    )
}