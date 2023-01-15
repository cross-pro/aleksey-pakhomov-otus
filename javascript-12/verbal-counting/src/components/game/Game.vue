<script setup lang="ts">



</script>

<style>
  @import './style.css';
</style>

<template>
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