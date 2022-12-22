import { Route } from "react-router-dom";
import React from "react";
import { CityWeather } from "../city-weather";
import { getCities } from "../../util/storage-util"

const cityRouter = () => {

    return getCities() && getCities().map(
        p =>
            <Route key={p.city_en + "day"} path={"/" + p.city_en}>
                <Route index element={<CityWeather name={p.city} name_en={p.city_en} />} />
                <Route path=":day" element={<CityWeather name={p.city} name_en={p.city_en} />} />
            </Route>
    )
}

export { cityRouter }
