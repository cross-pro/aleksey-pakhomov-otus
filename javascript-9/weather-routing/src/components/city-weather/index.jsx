import React from "react"

export const CityWeather = ({ name, days }) => {

    const defaultDays = 10
    if (days == undefined) days = defaultDays
    if (days > 30) days = 30

    return (
        <div>
            <p>Погода в городе {name}. Прогноза на {days} суток</p>
        </div>
    )
}