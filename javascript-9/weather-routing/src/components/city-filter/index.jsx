import React, {useState} from "react"
import "./index.css"
import {CityOffer} from "../city-offer";


export const CityFilter = () => {

    let [value, setValue] = useState("")

    const onChange = (e) => {
        let city = e.target.value
        setValue(city)
    }

    const onSearch = () => {
        console.log("search city:", value)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSearch()
        }
    }

    return (
        <div className="flex">
            <div className="form-group search-form">
                <input id="city" type="text" className="form-control"
                       placeholder="Название города..."
                       defaultValue={value}
                       onChange={onChange}
                       onKeyDown={handleKeyDown}
                />
                <button type="button" className="btn btn-primary"
                        onClick={onSearch}
                >Найти
                </button>
            </div>

            <CityOffer city={value}/>

        </div>
    )
}