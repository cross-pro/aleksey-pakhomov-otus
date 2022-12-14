import React from "react"
import {Main} from "./components/main";

import "./style/app.css"
import {CityRouter} from "./components/city-router";

export const App = () => {

    return (
        <div className="content">
            <Main/>
            <hr/>
            <CityRouter/>


        </div>

    )
}



