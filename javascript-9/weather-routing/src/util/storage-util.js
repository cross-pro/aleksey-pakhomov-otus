
const CITY_STORAGE = "cities"

const getCities = () => {
    return localStorage.getItem(CITY_STORAGE)
}

const findElementsFilter = (array, name) => {
    let result = array.filter((element)=> element.city.toLowerCase().startsWith(name.toLowerCase()))
    return result

}

const fineCitiyByName = (name) => {
    return findElementsFilter(getCities(), name)
}


export {fineCitiyByName, findElementsFilter, CITY_STORAGE}