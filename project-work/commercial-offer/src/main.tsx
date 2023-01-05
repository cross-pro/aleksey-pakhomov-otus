import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import App from './App'
import {Offer} from "./components/offer/"
import {NotFound} from "./components/not-found/index";
import {reducer} from "./redux/reducer";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";

let store = createStore(reducer)

const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <ApolloProvider client={client}>
                <Router>
                    <Routes>
                        <Route path={"/"}>
                            <Route index element={<App/>}/>
                        </Route>
                        <Route path={"/offer"}>
                            <Route index element={<NotFound/>}/>
                            <Route path=":id" element={<Offer/>}/>
                        </Route>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </Router>
            </ApolloProvider>
        </Provider>
    </React.StrictMode>,
)

