<script setup lang="ts">
import { onMounted, ref } from "vue"
import ISettings from "../../models/settings";
import { loadSettings } from "../../util/storage-util"
import { generateExample } from "../../util/exercise-generator"


let settings: ISettings = loadSettings()

let time = ref(settings.time)
let minutes = settings.time
let timerId: number
let seconds = 0

const generateSecret = () => {
    let result = ""
    for (let i = 0; i < settings.difficult; i++) {
        result += "*"
    }
    return result;
}

let numberStart = 1
let number1 = ref(generateSecret())
let number2 = ref(generateSecret())

const getSeconds = () => {
    switch (seconds) {
        case 0: return "00"
        case 1: return "01"
        case 2: return "02"
        case 3: return "03"
        case 4: return "04"
        case 5: return "05"
        case 6: return "06"
        case 7: return "07"
        case 8: return "08"
        case 9: return "09"
        default: return seconds;
    }
}

const setTimerValue = () => {
    let value = minutes + ":" + getSeconds()
    return value
}

const startTimer = () => {
    time.value = setTimerValue()
    timerId = setInterval(() => {
        if (seconds === 0) {
            seconds = 59
            minutes = minutes - 1
        } else {
            seconds--
        }
        if (minutes === 0 && seconds === 0) {
            clearInterval(timerId)
            time.value = "0:00"
            alert("Время вышло")
            return
        }
        time.value = setTimerValue()
    }, 1000)
}

const setExample = () => {
    let example = generateExample()
}

let position = 0
const getActive = () => {
    if (position < settings.difficult) return number1
    else return number2;
}

const clickOne = () => {
    clickButton(1)
}

const clickTwo = () => {
    clickButton(2)
}

const clickThree = () => {
    clickButton(3)
}

const clickFour = () => {
    clickButton(4)
}

const clickFive = () => {
    clickButton(5)
}

const clickSix = () => {
    clickButton(6)
}

const clickSeven = () => {
    clickButton(7)
}

const clickEight = () => {
    clickButton(8)
}

const clickNine = () => {
    clickButton(9)
}

const clickZero = () => {
    clickButton(0)
}



const clickButton = (value: number) => {
    let number = getActive()
    number.value = number.value.replace("*", value.toString())
    position++
}

onMounted(() => {
    console.log("start game")
    startTimer()
    setExample()
})

const onCancel = () => {
    clearInterval(timerId)
}

const clickBack = () => {

}

const clickForward = () => {

}

const clickHelp = () => {

}

const clickCheck = () => {

}

</script>

<style>
@import './style.css';
</style>

<template>
    <div class="action-line">
        <a href="#/settings" class="cancel-button" @click="onCancel">X отмена</a>
        <span class="timer">{{ time }}</span>
    </div>

    <div class="exercise-line">
        <div class="text-number text-start">{{ numberStart }}</div>
        <div class="text-operation">+</div>
        <div class="text-number secret-number">{{ number1 }}</div>
        <div class="text-operation">+</div>
        <div class="text-number secret-number">{{ number2 }}</div>
    </div>
    <div class="exercise-line">
        <div class="text-operation">=</div>
        <div class="text-number">6</div>
    </div>

    <div class="game">
        <div class="number-line">
            <input class="number-button" type="button" value="1" @click="clickOne" />
            <input class="number-button" type="button" value="2" @click="clickTwo" />
            <input class="number-button" type="button" value="3" @click="clickThree" />
            <input class="action-button" type="button" value="<" @click="clickBack" />
        </div>
        <div class="number-line">
            <input class="number-button" type="button" value="4" @click="clickFour" />
            <input class="number-button" type="button" value="5" @click="clickFive" />
            <input class="number-button" type="button" value="6" @click="clickSix" />
            <input class="action-button" type="button" value=">" @click="clickForward" />
        </div>
        <div class="number-line">
            <input class="number-button" type="button" value="7" @click="clickSeven" />
            <input class="number-button" type="button" value="8" @click="clickEight" />
            <input class="number-button" type="button" value="9" @click="clickNine" />
            <input class="action-button" type="button" value="?" @click="clickHelp" />
        </div>
        <div class="number-line">
            <input class="number-button" type="button" value="0" @click="clickZero" />
            <input class="action-button" type="button" value="=" @click="clickCheck" />
        </div>
    </div>
</template>