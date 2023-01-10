import React, {useState} from 'react'
import './App.css'
import "./style/bootstrap.min.css"
import {Login} from "./components/login/index";
import {PresentationList} from "./components/presentation-list/index";

function App() {

    let [isLoggedIn, setIsLoggedIn] = useState(true)
    let [isEdit, setIsEdit] = useState("false")

    /*здесь должна быть авторизация JWT xD*/
    if (!isLoggedIn) {
        return (
            <Login setIsLoggedIn={setIsLoggedIn}/>
        )
    } else {
        return (
            <div className="content">
                <div className="left">
                    <PresentationList/>
                </div>
                <div className="right">
                    Редактирование элемента
                </div>
            </div>
        )
    }
}

export default App
