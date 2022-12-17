import React, { useEffect } from "react"
import "./index.css"
import { formatDay } from "../../util/date-util"

export const WeatherDay = ({ dayParams }) => {

    useEffect(() => {
        console.log("dayparams:", dayParams)
    }, [])

    return (
        <div className="weather-day">
            <div className="flex">
                <div>Дата {formatDay()}</div>
                <div>Температура: {dayParams.temerature} &#8451;</div>
                <div>Ветер: {dayParams.wind}</div>
                <div>Осадки: {dayParams.precipitation}</div>
            </div>
        </div>
    )
}