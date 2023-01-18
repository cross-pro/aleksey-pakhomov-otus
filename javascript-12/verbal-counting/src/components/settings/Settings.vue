<script setup lang="ts">
import "./style.css"
import Slider from "../../components/slider/Slider.vue"
import Statistics from "../../components/statistics/Statistics.vue"
import { onMounted } from "vue"
import { loadSettings, save } from "../../util/storage-util"
import ISettings from "../../models/settings"

let storage: ISettings = loadSettings()

onMounted(() => {
    storage = loadSettings()
})




const saveSum = () => {
    if (storage.sum) {
        save("sum", "F")
        storage.sum = false
    } else {
        save("sum", "T")
        storage.sum = true
    }
}

const saveDiff = () => {
    if (storage.diff) {
        save("diff", "F")
        storage.diff = false
    } else {
        save("diff", "T")
        storage.diff = true
    }
}

const saveMult = () => {
    if (storage.mult) {
        save("mult", "F")
        storage.mult = false
    } else {
        save("mult", "T")
        storage.mult = true
    }
}

const saveDivide = () => {
    if (storage.divide) {
        save("divide", "F")
        storage.divide = false
    } else {
        save("divide", "T")
        storage.divide = true
    }
}

const saveExp = () => {
    if (storage.exp) {
        save("exp", "F")
        storage.exp = false
    } else {
        save("exp", "T")
        storage.exp = true
    }
}

</script>

<template>
    <div class="settings">
        <h3>Привет!</h3>
        <Statistics />

        <div class="sets">
            <p>Настройки</p>

            <Slider />

            <div class="inline">
                <input type="checkbox" id="sum" value="sum" v-model="storage.sum" @click="saveSum">
                <label for="sum">Суммирование</label>
            </div>
            <div class="inline">
                <input type="checkbox" id="difference" value="difference" v-model="storage.diff" @click="saveDiff">
                <label for="difference">Разность</label>
            </div>
            <div class="inline">
                <input type="checkbox" id="multiplication" value="multiplication" v-model="storage.mult" @click="saveMult">
                <label for="multiplication">Умножение</label>
            </div>
            <div class="inline">
                <input type="checkbox" id="divide" value="divide" v-model="storage.divide" @click="saveDivide">
                <label for="divide">Деление</label>
            </div>
            <div class="inline">
                <input type="checkbox" id="exponentiation" value="exponentiation" v-model="storage.exp" @click="saveExp">
                <label for="exponentiation">Возведение в степень</label>
            </div>
        </div>
        <div class="play">
            <a href="#/game" class="btn btn-default btn-play">Играть!</a>
        </div>
    </div>

</template>


