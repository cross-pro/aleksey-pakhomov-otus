import { Routes, Route } from "react-router-dom";
import React from "react";
import { CityWeather } from "../city-weather";
import { getCities } from "../../util/storage-util"

const cityRouter = () => {
    return getCities() && getCities().map(
        p => <Route key={p.city_en}
            exact path={"/" + p.city_en}
            element={<CityWeather name={p.city} />} />)
}

const cityRouterDays = () => {
    return getCities() && getCities().map(
        p => <Route key={p.city_en}
            path={"/" + p.city_en + "/:days"}
            element={<CityWeather name={p.city} days={2} />} />)
}

export { cityRouter, cityRouterDays }