import React, { useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import { isNumeric } from "../../util/type-util";

export const CityWeather = ({ name }) => {
    const defaultDays = 3

    let [days, setDays]  = useState(defaultDays)
    let params = useParams();
    
    useEffect(()=>{
        let {days} = params
        if (days==undefined) days=defaultDays
        if (!isNumeric(days)) days = defaultDays
        if (days >30) days=30

        setDays(days)
    }, [name, days])

    return (
        <div>
            <p>Погода в городе {name}. Прогноз на {days} суток</p>
        </div>
    )
}
