import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import App from './App'
import {Offer} from "./components/offer/"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path={"/"}>
                    <Route index element={<App/>}/>
                </Route>
                <Route path={"/offer"}>
                    <Route index element={<Offer/>}/>
                    <Route path=":id" element={<Offer/>} />
                </Route>
            </Routes>
        </Router>
    </React.StrictMode>,
)
