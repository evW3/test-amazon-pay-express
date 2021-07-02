import { get, put } from 'axios'
import { API_URL } from  "@/constants"

export default {
    state: { hospitals: [] },
    getters: { hospitals: s => s.hospitals },
    mutations: {
        setHospital(state, hospitals) {
            state.hospitals = hospitals;
        }
    },
    actions: {
        async hospitalsFetchInfo({ dispatch, commit }) {
            try {
                const res = await get(`${ API_URL }hospitals`);
                await commit('setHospital', res.data.hospitals);
            } catch (e) {
                console.log(`[VUEX ERROR]: hospitalsFetchInfo [${ e }]`);
            }
        },

        async merge({ dispatch, commit }, params) {
            try {
                let tmp = await this.getters.hospitals;
                tmp[params.medicineIndex] = { ...tmp[params.medicineIndex], ...params.data }
                await commit('setHospital', tmp);
                await put(`${ API_URL }hospitals/update`, { id: tmp[params.medicineIndex].id, params: params.data });
            } catch(e) {
                console.log(`[VUEX ERROR]: merge [${ e }]`);
            }
        }
    }
};