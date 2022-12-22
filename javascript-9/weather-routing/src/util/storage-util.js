
const CITY_STORAGE = "cities"

const getCities = () => {
    return JSON.parse(localStorage.getItem(CITY_STORAGE))
}

const findElementsFilter = (array, name) => {
    let result = array.filter((element)=> element.city.toLowerCase().startsWith(name.toLowerCase()))
    return result

}

const findCitiesByName = (name) => {
    return findElementsFilter(getCities(), name)
}


export {getCities, findCitiesByName, findElementsFilter, CITY_STORAGE}