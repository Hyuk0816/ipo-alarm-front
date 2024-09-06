import { createWebHistory, createRouter } from "vue-router";

import IpoData from "../components/IpoData.vue";
import KakaoLogin from "../components/KakaoLogin.vue";
import MonthlyChart from "../components/MonthlyChart.vue";
import ListingShares from "../components/ListingShares.vue";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path:'/',component:MonthlyChart},
        {path:'/login',component:KakaoLogin},
        {path: '/IpoData', component:IpoData},
        {path: '/ListingShares', component:ListingShares},
    ]
})

export default router;