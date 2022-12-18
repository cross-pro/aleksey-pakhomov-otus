import React from "react"
import { Main } from "./components/main";
import { DataComponent } from "./components/data-component";
import { BrowserRouter as Router, Routes } from "react-router-dom"

import "./style/app.css"
import { cityRouter, cityRouterDays } from "./components/city-router";

export const App = () => {

    return (
        <div className="content">
            <DataComponent />
            <Main />
            <hr />
            <Routes>
                {cityRouter()}
                {cityRouterDays()}
            </Routes>
        </div>
    )
}



