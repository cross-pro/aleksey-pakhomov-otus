import React, {useState} from 'react'
import './App.css'
import "./style/bootstrap.min.css"
import {Login} from "./components/login/index";
import {PresentationList} from "./components/presentation-list/index";

function App() {

    let [isLoggedIn, setIsLoggedIn] = useState(true)

    /*здесь должна быть авторизация JWT xD*/
    if (!isLoggedIn) {
        return (
            <Login setIsLoggedIn={setIsLoggedIn}/>
        )
    } else {
        return (
            <div className="content">
                <PresentationList />
            </div>
        )
    }
}

export default App
