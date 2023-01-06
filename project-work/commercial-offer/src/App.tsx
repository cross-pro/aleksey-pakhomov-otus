import React, {useState} from 'react'
import './App.css'
import "./style/bootstrap.min.css"
import {Login} from "./components/login/index";

function App() {

    let [isLoggedIn, setIsLoggedIn] = useState(false)

    if (!isLoggedIn) {
        return (
            <Login setIsLoggedIn={setIsLoggedIn}/>
        )
    } else {
        return (
            <div className="content">
                <h1>Главная страница</h1>
            </div>
        )
    }
}

export default App
