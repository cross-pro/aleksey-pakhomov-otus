<script setup lang="ts">
import { onMounted, ref } from "vue"
import ISettings from "../../models/settings";
import { loadSettings } from "../../util/storage-util"


let settings: ISettings = loadSettings()

let time = ref(settings.time)
let minutes = settings.time
let timerId: number
let seconds = 0


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
            time.value="0:00"
            alert("Время вышло")
            return
        }
        time.value = setTimerValue()
    }, 1000)
}



onMounted(() => {
    console.log("start game")
    startTimer()
})


const onCancel = () => {
    clearInterval(timerId)
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
        <div class="text-number text-start">1</div>
        <div class="text-operation">+</div>
        <div class="text-number secret-number">&nbsp;</div>
        <div class="text-operation">+</div>
        <div class="text-number secret-number">&nbsp;</div>
    </div>
    <div class="exercise-line">
        <div class="text-operation">=</div>
        <div class="text-number">6</div>
    </div>

    <div class="game">
        <div class="number-line">
            <input class="number-button" type="button" value="1" />
            <input class="number-button" type="button" value="2" />
            <input class="number-button" type="button" value="3" />
            <input class="action-button" type="button" value="<" />
        </div>
        <div class="number-line">
            <input class="number-button" type="button" value="4" />
            <input class="number-button" type="button" value="5" />
            <input class="number-button" type="button" value="6" />
            <input class="action-button" type="button" value=">" />
        </div>
        <div class="number-line">
            <input class="number-button" type="button" value="7" />
            <input class="number-button" type="button" value="8" />
            <input class="number-button" type="button" value="9" />
            <input class="action-button" type="button" value="?" />
        </div>
        <div class="number-line">
            <input class="number-button" type="button" value="0" />
            <input class="action-button" type="button" value="=" />
        </div>
    </div>
</template>