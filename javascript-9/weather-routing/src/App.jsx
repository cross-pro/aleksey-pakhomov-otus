import React from "react"
import {Main} from "./components/main";
import {DataComponent} from "./components/data-component";
import {BrowserRouter as Router} from "react-router-dom"

import "./style/app.css"
import {CityRouter} from "./components/city-router";

export const App = () => {

    return (
        <div className="content">
            <Router>
                <DataComponent/>
                <Main/>
                <hr/>
                <CityRouter/>
            </Router>
        </div>
    )
}



