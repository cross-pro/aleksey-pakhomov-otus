import React, {useEffect, useState} from "react";
import {findCitiesByName, getCities} from "../../util/storage-util"
import {CityRow} from "../city-row/index"

export const CityOffer = ({city}) => {

    let [data, setData] = useState([])

    useEffect(() => {
        if (city === "")
            setData(getCities())
    }, [])


    useEffect(() => {

        let cities = []
        if (city === undefined || city === null || city === "") {
            cities = getCities()
            setData(cities)
        }
        else {
            cities = findCitiesByName(city)
            setData(cities)
        }
    }, [city])

    return (
        <div className="flex">

            <span id="helpBlock" className="help-block cities">{
                data !== undefined
                && data !== null
                && data.length > 0
                && data.map(p => <CityRow key={p.city_en} name={p.city} name_en={p.city_en}/>)}</span>
        </div>

    )
}