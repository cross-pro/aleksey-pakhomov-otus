import React from "react"
import { Main } from "./components/main";
import { DataComponent } from "./components/data-component";
import { Routes } from "react-router-dom"

import "./style/app.css"
import { cityRouter } from "./components/city-router";

export const App = () => {

    return (
        <div className="content">
            <DataComponent />
            <Main />
            <hr />
            <Routes>
                {cityRouter()}
            </Routes>
        </div>
    )
}



