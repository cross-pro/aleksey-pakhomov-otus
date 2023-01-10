import React, {Dispatch, SetStateAction, useState} from "react"
import "./style.css"
import {ErrorMessage} from "../error-message/index";
import {gql, useLazyQuery} from "@apollo/client";
import ICredentials from "../../models/credentials";

export const Login = ({setIsLoggedIn}: { setIsLoggedIn: Dispatch<SetStateAction<boolean>> }) => {

    let [login, setLogin] = useState("")
    let [password, setPassword] = useState("")
    let [errorMessage, setErrorMessage] = useState("")

    const CREDENTIALS_QUERY = gql`
        query GetCredentials ($login: String)  {
            credentialsByLogin(login: $login) {
                login
                password
            }
        }
    `;

    const [loadExpenseStatus, {loading, error, data}] = useLazyQuery(CREDENTIALS_QUERY, {
        variables: {
            login: login
        }
    });

    const showErrorMessage = (message: string) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage("")
        }, 2000)
    }

    const clearForm = () => {
        setLogin("")
        setPassword("")
    }

    const auth = () => {

        if (!login || !password) {
            showErrorMessage("Заполните необходимые поля")
            return
        }

        loadExpenseStatus()
            .then((data: any) => {
                let credentials = data.data.credentialsByLogin as ICredentials
                if (credentials.login === login && credentials.password === password) {
                    setIsLoggedIn(true)
                } else {
                    showErrorMessage("Ошибка авторизации")
                    clearForm()
                }
            }).catch(() => {
            showErrorMessage("Ошибка авторизации")
            clearForm()
        })
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
            {errorMessage ? <ErrorMessage errorMessage={errorMessage}/> : null}
            <div className="login-page">
                <div className="login-form">
                    <input type="text" placeholder="Логин" className="form-control" value={login}
                           onChange={onLogin}/>
                    <input type="password" placeholder="Пароль" className="form-control" value={password}
                           onChange={onPassword}/>
                    <button className="btn btn-primary"
                            onClick={auth}
                    >Войти
                    </button>
                </div>
            </div>
        </div>
    )
}