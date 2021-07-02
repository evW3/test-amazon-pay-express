import axios from 'axios'
import { API_URL } from  "@/constants"

export default {
    state: { hospitalNames: [] },
    getters: { hospitalNames: s => s.hospitalNames },
    mutations: {
        setHospitalNames(state, hospitalNames) {
            state.hospitalNames = hospitalNames ;
        },
        pushIntoHospitalNames(state, name) {
            state.hospitalNames = [...state.hospitalNames, name];
        }
    },
    actions: {
        async fetchHospitalNames({ dispatch, commit }, id) {
            try {
                const res = await axios.get(`${API_URL}hospitals/names/${ id }`);
                await commit('setHospitalNames', res.data.hospitalNames);
            } catch (e) {
                console.log(`[VUEX ERROR]: fetchHospitalNames [${ e }]`);
            }
        },

        async createHospitalName({ dispatch, commit }, data) {
            try {
                if(data.name.trim()) {
                    const id = await axios.put(`${ API_URL }hospitals/names/${ data.hospitalId }`, data);
                    await commit('pushIntoHospitalNames', { id: id.data.id, hospitalId: data.hospitalId, name: data.name });
                }
            } catch (e) {
                console.log(`[VUEX ERROR]: createHospitalName [${ e }]`);
            }
        },

        async deleteHospitalName({ dispatch, commit }, params) {
            try {
                let hospitalNames = this.getters.hospitalNames;
                await axios.delete(`${ API_URL }hospitals/names/${ params.id }`);
                hospitalNames.splice(params.nameId, 1);
            } catch (e) {
                console.log(`[VUEX ERROR]: deleteHospitalName [${ e }]`);
            }
        },

        async changeName({ dispatch, commit }, params) {
            try {
                let hospitalNames = this.getters.hospitalNames;
                hospitalNames[params.nameId].name = params.name;
                await axios.post(`${ API_URL }hospitals/names/${ params.id }`, { name: params.name });
            } catch (e) {
                console.log(`[VUEX ERROR]: changeName [${ e }]`);
            }
        }
    }
};