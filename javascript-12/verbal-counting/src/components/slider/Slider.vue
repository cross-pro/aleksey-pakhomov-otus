<script setup lang="ts">
    import "./style.css"
    import {ref} from 'vue'

    let time = ref(5)
    let level = ref(5)

    const increaseDuration = () => {
        if (time.value < 15) time.value = time.value + 1
    }

    const decreaseDuration = () => {
        if (time.value > 1)
            time.value = time.value - 1
    }

    const increaseLevel = () => {
        if (level.value<10) level.value = level.value+1
    }

    const decreaseLevel = () => {
        if (level.value>1) level.value = level.value-1
    }
</script>

<!--имитация слайдера с двумя кнопками увеличить и уменьшить-->
<template>
    <div class="slider">
        <div>
            <div class="value-changer">
                <button class="btn btn-default" v-on:click="decreaseDuration">-</button>
                <span>&nbsp;&nbsp;&nbsp;{{time}}&nbsp;&nbsp;&nbsp;</span>
                <button class="btn btn-default" v-on:click="increaseDuration">+</button>
            </div>
            <div class="value-label">
                <span>Длительнось {{time}} минут</span>
            </div>
        </div>
        <div class="level-changer">
            <div >
                <button class="btn btn-default" v-on:click="decreaseLevel">-</button>
                <span>&nbsp;&nbsp;&nbsp;{{level}}&nbsp;&nbsp;&nbsp;</span>
                <button class="btn btn-default" v-on:click="increaseLevel">+</button>
            </div>
            <div class="value-label">
                <span>Сложность {{level}}</span>
            </div>
        </div>
        <hr/>

    </div>
</template>
