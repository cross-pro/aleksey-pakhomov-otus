import React from "react"
import "./index.css"

export const Presentation = ({description, id}: {description: string, id: string}) => {

    const onClick = () => {
    }

    return (
        <div onClick={onClick} className="presentation">
            {description}
        </div>
    )
}