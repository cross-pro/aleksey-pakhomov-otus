import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { isNumeric } from "../../util/type-util";
import { getFull } from "../../util/weather-generator"
import { WeatherDay } from "../weather-day";
import "./index.css"

export const CityWeather = ({ name }) => {
    const defaultDays = 3

    let [days, setDays] = useState(defaultDays)
    let params = useParams();

    let [weather, setWeather] = useState([])

    useEffect(() => {
        let { days } = params
        if (days == undefined) days = defaultDays
        if (!isNumeric(days)) days = defaultDays
        if (days > 30) days = 30

        setDays(days)


        console.log(getFull(days))
        setWeather(getFull(days))
    }, [name, days])

    return (
        <div>
            <p>Погода в городе <b>{name}</b>. Прогноз на <b>{days}</b> суток</p>
            <div className="weather-result">
                {
                    weather.map(e => <WeatherDay dayParams={e} />)
                }
            </div>

        </div>
    )
}
