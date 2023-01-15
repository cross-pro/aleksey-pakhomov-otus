<script setup lang="ts">
    import Settings from "./components/settings/Settings.vue"
    import Game from "./components/game/Game.vue"

    const routes = [
    { path: '/', component: Settings },
    { path: '/game', component: Game },
]


</script>


<template>
    <Navigation/>
    <div class="content">
        <!-- <Settings/> -->
       <Game/>
    </div>
</template>
