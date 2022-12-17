
const formatDay = (day) => {
    let d = new Date().toLocaleString("ru", {})
    //let result = d.getMonth()+"."+d.getDay()
    return d
}

export {formatDay}