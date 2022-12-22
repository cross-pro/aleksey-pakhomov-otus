import React, { useEffect } from "react"
import "./index.css"
import { formatDay } from "../../util/date-util"

export const WeatherDay = ({ dayParams }) => {

    return (
        <div className="weather-day">
            <div className="flex">
                <div>Погода на <b>{formatDay(dayParams.index)}</b></div>
                <hr/>
                <div>Температура: {dayParams.temerature} &#8451;</div>
                <div>Ветер: {dayParams.wind}</div>
                <div>Осадки: {dayParams.precipitation}</div>
            </div>
        </div>
    )
}