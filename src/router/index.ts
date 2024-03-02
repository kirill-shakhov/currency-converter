import { createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router';
import modules from "../modules/index.ts";
import { store } from "../store";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...modules.router
    ]
});

// router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
//     await store.dispatch('currency/getCurrencies');
//     next();
// });


export default router;
