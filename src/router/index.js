import Vue from 'vue'
import Router from 'vue-router'
import Personalized from "../page/Personalized/Personalized.vue"
import Hotlist from "../page/Hotlist/Hotlist.vue"
import Search from "../page/Search/Search.vue"
import Player from "../page/Player/Player.vue"
import Bundle from "../page/Bundle/Bundle.vue"

Vue.use(Router)

export default new Router({
    routes: [{
            path: "/",
            redirect: "/personalized"
        },
        {
            path: "/personalized",
            component: Personalized,
        },
        {
            path: "/hotlist",
            component: Hotlist,
        },
        {
            path: "/search",
            component: Search,
        },
        {
            path: "/player",
            component: Player,
            name: "player",
            meta: {
                hideOther: true
            }
        },
        {
            path: "/bundle/:id",
            component: Bundle,
            meta: {
                hideOther: true
            }
        }
    ]
})