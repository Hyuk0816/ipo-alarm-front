import { createWebHistory, createRouter } from "vue-router";

import IpoData from "../components/IpoData.vue";
import KakaoLogin from "../components/KakaoLogin.vue";
import MonthlyChart from "../components/MonthlyChart.vue";
import Navbar from "../components/Navbar.vue";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path:'/',component:IpoData},
        {path:'/login',component:KakaoLogin},
    ]
})

export default router;