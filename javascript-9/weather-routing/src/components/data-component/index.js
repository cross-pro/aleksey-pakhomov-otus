import React, {useEffect} from "react"
import {CITY_STORAGE} from "../../util/storage-util";

const storage = [
    {
        city: "Краснодар",
        city_en: "krasnodar",
    },
    {
        city: "Москва",
        city_en: "moscow",
    },
    {
        city: "Красноярск",
        city_en: "krasnoyarsk",
    },
    {
        city: "Ростов",
        city_en: "rostov",
    },
    {
        city: "Ростов-на-дону",
        city_en: "rostov-don",
    },
    {
        city: "Самара",
        city_en: "samara",
    },
    {
        city: "Астрахань",
        city_en: "astrakhan",
    },
    {
        city: "Екатеринбург",
        city_en: "ekaterinburg",
    },
    {
        city: "Пенза",
        city_en: "penza",
    },
    {
        city: "Ставрополь",
        city_en: "stavropol",
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