import React, {Dispatch, SetStateAction, useEffect, useState} from "react"
import "./style.css"
import {ErrorMessage} from "../error-message/index";

export const Login = ({setIsLoggedIn}: { setIsLoggedIn: Dispatch<SetStateAction<boolean>> }) => {

    useEffect(() => {

    }, [])

    let [login, setLogin] = useState("")
    let [password, setPassword] = useState("")
    let [errorMessage, setErrorMessage] = useState("")

    const auth = () => {

        console.log(login, password)

        if (login === "login" && password === "password") {
            setIsLoggedIn(true)
        }
        else {
            setErrorMessage("Ошибка авторизации")
            setLogin("")
            setPassword("")

            setTimeout(() => {
                setErrorMessage("")
            },2000)
        }
    }

    const onLogin = (e: any) => {
        setErrorMessage("")
        setLogin(e.target.value)
    }

    const onPassword = (e: any) => {
        setErrorMessage("")
        setPassword(e.target.value)
    }

    return (
        <div>
            {errorMessage ? <ErrorMessage errorMessage={errorMessage}/> : null }
            <div className="login-page">
                <div className="login-form" onSubmit={auth}>
                    {/*<form>*/}
                        <input type="text" placeholder="Логин" className="form-control" value={login}
                               onChange={onLogin}/>
                        <input type="password" placeholder="Пароль" className="form-control" value={password}
                               onChange={onPassword}/>
                        <button className="btn btn-primary"
                                onClick={auth}
                        >Войти
                        </button>
                    {/*</form>*/}
                </div>
            </div>
        </div>
    )
}