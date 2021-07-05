import { createWebHistory, createRouter } from 'vue-router';
import axios from 'axios';
import { API_URL } from '@/constants'

const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('../views/Home.vue')
        },
        {
            path: '/accepted-pay',
            name: 'Checkout',
            component: () => import('../views/Checkout.vue')
        },
        {
            path: '/merchant-confirm-page',
            name: 'MerchantConfirmPage',
            component: () => import('../views/MerchantConfirmPage.vue')
        }
    ]
});

export default router;


