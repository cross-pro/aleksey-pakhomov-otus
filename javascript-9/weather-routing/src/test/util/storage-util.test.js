import {test, expect} from "vitest"
import {findElementsFilter} from "../../util/storage-util"

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


test("findElementsFilter", ()=> {
    let data = findElementsFilter(storage, "крас")
    console.log(data)
    data = JSON.stringify(data)
    expect(data).toBe('[{"city":"Краснодар"},{"city":"Красноярск"}]')

    data = findElementsFilter(storage, "жо")
    expect(data).toStrictEqual([])
})