import React from "react"
import "./index.css"

export const Presentation = ({description}: {description: string}) => {
    return (
        <div className="presentation">
            {description}
        </div>
    )
}