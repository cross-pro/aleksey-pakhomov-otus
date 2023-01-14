import React from "react";
import "./index.css"

export const SlideDescription = ({ description } : { description: string}) => {
    return <div className="slide-description">{description}</div>;
}
