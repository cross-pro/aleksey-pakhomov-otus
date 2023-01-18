import { createRouter, createWebHashHistory } from "vue-router"
import Settings from "./components/settings/Settings.vue"
import Game from "./components/game/Game.vue"

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/settings", component: Settings, alias: "/" },
        { path: "/game", component: Game},
    ]
})
