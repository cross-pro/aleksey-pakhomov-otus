import React from "react";

export const CityOffer = ({city}) => {
    if (city)
        return (
            <div>
                <span id="helpBlock" className="help-block">Поиск: {city}</span>
            </div>
        )
}