<script setup lang="ts">



</script>

<style>
@import './style.css';
</style>

<template>
    <div class="action-line">
        <a href="#/settings" class="cancel-button">X отмена</a>
        <input type="button" class="timer" value="5:00" />
    </div>

    <div class="exercise-line">
        <div class="text-number">1</div>
        <div class="text-operation">+</div>
        <div class="text-number">2</div>
        <div class="text-operation">+</div>
        <div class="text-number">3</div>
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