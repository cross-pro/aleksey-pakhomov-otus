export async function generateNumberBetween(min, max) {
    let randomNumber = Math.floor(
            Math.random() * (max - min) + min
        )
    return randomNumber
}