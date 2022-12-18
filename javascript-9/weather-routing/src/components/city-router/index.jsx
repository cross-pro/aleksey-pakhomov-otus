import { Route } from "react-router-dom";
import React from "react";
import { CityWeather } from "../city-weather";
import { getCities } from "../../util/storage-util"

const cityRouter = () => {
    return getCities() && getCities().map(
        p => <Route key={p.city_en}
            exact path={"/" + p.city_en}
            element={<CityWeather name={p.city} name_en={p.city_en}/>} />)
}

const cityRouterDays = () => {

    return getCities() && getCities().map(
        p =>
            <Route key={p.city_en + "day"}
                path={"/" + p.city_en + "/:day"}
                element={<CityWeather name={p.city} name_en={p.city_en}/>}
            />
    )
}

export { cityRouter, cityRouterDays }
