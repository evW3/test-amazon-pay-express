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
            name: 'Accepted-pay',
            component: () => import('../views/AcceptedPay.vue')
        }
    ]
});

export default router;


