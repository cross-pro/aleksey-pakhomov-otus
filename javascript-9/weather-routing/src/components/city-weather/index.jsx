import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { isNumeric } from "../../util/type-util";
import { getFull } from "../../util/weather-generator"
import { WeatherDay } from "../weather-day"
import { uuidv4 } from "../../util/random-util"
import "./index.css"

export const CityWeather = ({ name }) => {
    const defaultDays = 3

    let [days, setDays] = useState(defaultDays)
    let params = useParams();
    let [weather, setWeather] = useState([])

    const setWeek = () => {
        setDays(7)
    }

    const setTen = () => {
        setDays(10)
    }

    const setTwoWeeks = () => {
        setDays(14)
    }

    const setMonth = () => {
        setDays(30)
    }

    useEffect(()=>{
        setWeather(getFull(days))
    },[days])

    useEffect(() => {
        setWeather(getFull(days))
    }, [name])

    useEffect(()=>{
        let { day } = params

        if (day == undefined) return
        if (days === day) return
        if (!isNumeric(day)) day = defaultDays
        if (day > 30) day = 30

        setDays(day)
        setWeather(getFull(day))
    })

    return (
        <div>
            <div className="day-choice">
                <span>Погода в городе <b>{name}</b>. Прогноз на <b>{days}</b> суток</span>
                <button className="btn btn-default btn-lg active" role="button" onClick={setWeek}>Неделя</button>
                <button className="btn btn-default btn-lg active" role="button" onClick={setTen}>10 дней</button>
                <button className="btn btn-default btn-lg active" role="button" onClick={setTwoWeeks}>2 недели</button>
                <button className="btn btn-default btn-lg active" role="button" onClick={setMonth}>Месяц</button>
            </div>
            
            <div className="weather-result">
                {
                    weather.map(e => <WeatherDay key={uuidv4()} dayParams={e} />)
                }
            </div>
        </div>
    )
}
