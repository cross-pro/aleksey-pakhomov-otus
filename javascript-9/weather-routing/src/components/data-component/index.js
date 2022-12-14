import React, {useEffect} from "react"
import {CITY_STORAGE} from "../../util/storage-util";

const storage = [
    {
        city: "Краснодар",
    },
    {
        city: "Москва",
    },
    {
        city: "Красноярск",
    },
    {
        city: "Ростов",
    },
    {
        city: "Ростов-на-дону",
    },
    {
        city: "Самара",
    },
    {
        city: "Астрахань",
    },
    {
        city: "Екатеринбург",
    },
    {
        city: "Пенза",
    },
    {
        city: "Ставрополь",
    },
]


export const DataComponent = () => {
    useEffect(() => {
        console.log("Сохранение данных городов в хранилище")
        localStorage.setItem(CITY_STORAGE, JSON.stringify(storage))

        return () => {
            console.log("Очистка данных хранилища")
            localStorage.removeItem(CITY_STORAGE)
        }
    })

}