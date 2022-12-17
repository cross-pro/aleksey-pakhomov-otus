const options = {
month: 'long',
day: 'numeric',
timezone: 'UTC'
};


const formatDay = (day) => {
    let date = new Date();
    date.setDate(date.getDate() + day);
    return date.toLocaleString("ru", options)
}

export {formatDay}