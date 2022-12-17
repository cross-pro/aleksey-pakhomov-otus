const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const windArray = [
    "северо-западный",
    "северный",
    "южный",
    "восточный",
    "западный",
    "северо-восточный",
    "юго-восточный",
    "юго-западный",
    "не ожидается"
]

const precipitationArray = [
    "дождь",
    "снег",
    "град",
    "без осадков",
]

const temerature = () => {
    return getRandomInt(45)
}

const precipitation = () => {
    return precipitationArray[getRandomInt(4)]
}

const wind = () => {
    return windArray[getRandomInt(8)]
}

const getFull = (days) => {
    const result = []
    for (let i = 0; i < days; i++) {
        let day = {}
        day.wind = wind()
        day.precipitation = precipitation()
        day.temerature = temerature()
        day.index=i

        result.push(day)
    }
    return result
}

export { getFull }