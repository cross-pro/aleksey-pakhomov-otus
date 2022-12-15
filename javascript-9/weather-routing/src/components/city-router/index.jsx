import {Routes, Route} from "react-router-dom";
import React from "react";
import {CityWeather} from "../city-weather";
import {getCities} from "../../util/storage-util"

export const CityRouter = () => (
    <Routes>
        {
            getCities() && getCities().map(
                p => <Route key={p.city_en}
                            path={"/" + p.city_en}
                            element={<CityWeather name={p.city}/>}/>)
        }
    </Routes>
)
