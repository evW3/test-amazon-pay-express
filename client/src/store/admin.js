import { post } from 'axios'
import { API_URL } from  "@/constants"

export default {
    state: { admin: {} },
    getters: { admin: s => s.admin },
    mutations: {
        setAdmin(state, token) {
            state.admin = { token };
        }
    },
    actions: {
        async fetchAdmin({ commit }, code) {
            try {
                const token = await post(`${ API_URL }admin/sign-in`, { code });
                localStorage.setItem('token', token.data.token);
                await commit('setAdmin', token.data.token);
            } catch (e) {
                await commit('setAdmin', 'INVALID');
                console.log(`[VUEX ERROR]: fetchAdmin [${ e }]`);
            }
        }
    }
};