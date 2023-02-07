import React from "react"
import "./index.css"

export const ErrorMessage = ({errorMessage}: {errorMessage: string}) => {
    return (
        <div className="error-message">
            {errorMessage}
        </div>
    )
}