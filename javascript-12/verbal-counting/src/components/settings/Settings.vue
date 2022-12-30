<script setup lang="ts">
    import "./style.css"
    import Slider from "../../components/slider/Slider.vue"

    const play = () => {
        console.log("play")
    }
</script>

<template>
    <div class="settings">
        <h3>Привет!</h3>
        <div class="statistics">

        </div>

        <div class="sets">
            <p>Настройки</p>

            <Slider/>

            <div class="inline">
                <input type="checkbox" id="sum" value="sum">
                <label for="sum">Суммирование</label>
            </div>
            <div class="inline">
                <input type="checkbox" id="difference" value="difference">
                <label for="difference">Разность</label>
            </div>
            <div class="inline">
                <input type="checkbox" id="multiplication" value="multiplication">
                <label for="multiplication">Умножение</label>
            </div>
            <div class="inline">
                <input type="checkbox" id="divide" value="divide">
                <label for="divide">Деление</label>
            </div>
            <div class="inline">
                <input type="checkbox" id="exponentiation" value="exponentiation">
                <label for="exponentiation">Возведение в степень</label>
            </div>
        </div>
        <button class="btn btn-default" @click="play">Играть</button>
    </div>

</template>


