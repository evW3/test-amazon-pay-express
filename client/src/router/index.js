import {createRouter, createWebHashHistory} from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/accepted-pay',
        name: 'Checkout',
        component: () => import('../views/Checkout.vue')
    },
    {
        path: '/merchant-confirm-page',
        name: 'Merchant',
        component: () => import('../views/MerchantConfirmPage.vue')
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});


