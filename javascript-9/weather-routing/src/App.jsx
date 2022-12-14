import React from "react"
import {Main} from "./components/main";
import {DataComponent} from "./components/data-component";

import "./style/app.css"
import {CityRouter} from "./components/city-router";

export const App = () => {

    return (
        <div className="content">
            <DataComponent/>
            <Main/>
            <hr/>
            <CityRouter/>


        </div>

    )
}



