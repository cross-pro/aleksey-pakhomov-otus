import React, { useEffect, useState } from "react"
import { useParams, useNavigate  } from "react-router-dom"
import { isNumeric } from "../../util/type-util";
import { getFull } from "../../util/weather-generator"
import { WeatherDay } from "../weather-day"
import { uuidv4 } from "../../util/random-util"
import "./index.css"

export const CityWeather = ({ name, name_en }) => {

    let navigation = useNavigate()


    const defaultDays = 3

    let [days, setDays] = useState(defaultDays)
    let params = useParams();
    let [weather, setWeather] = useState([])

    const setWeek = () => {
        //честно говоря не разобрался как правильно использовать относительные пути
        //чтобы к примеру при повтормном клике не добавлялось /7/7
        //если есть правильные практики, подскажите пожалуйста :-)
        navigation("../../"+name_en+"/7")
    }

    const setTen = () => {
        navigation("../../"+name_en+"/10")
    }

    const setTwoWeeks = () => {
        navigation("../../"+name_en+"/14")
    }

    const setMonth = () => {
        navigation("../../"+name_en+"/30")
    }

    useEffect(() => {
        setWeather(getFull(days))
    }, [days])

    useEffect(() => {
        setWeather(getFull(days))
    }, [name])

    useEffect(() => {
        let { day } = params

        if (day == undefined) return
        if (days === day) return
        if (!isNumeric(day)) day = defaultDays
        if (day > 30) return

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
