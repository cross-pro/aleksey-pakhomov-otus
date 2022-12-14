import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Moscow} from "../moscow";
import {Krasnodar} from "../krasnodar";
import React from "react";


export const CityRouter = () => (
    <div>
        <Router>
            <div>

                <Routes>
                    <Route path="/" element={<Moscow/>}/>
                    <Route path="/krasnodar" element={<Krasnodar/>}/>
                    <Route path="/moscow" element={<Moscow/>}/>
                </Routes>

            </div>
        </Router>
    </div>
)