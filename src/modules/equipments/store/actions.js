import apiClient from "@/resources/apiClient";

export default {

    get_equipments: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.equipment.get_equipments()
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    search_equipments: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.equipment.search_equipments(data)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_equipments_with_url: ({commit}, url) => {
        return new Promise((resolve, reject) => {
            apiClient.equipment.get_equipments_with_url(url)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_equipment_filters: ({commit},) => {
        return new Promise((resolve, reject) => {
            apiClient.equipment.get_equipment_filters()
            .then(response => {
                commit("SET_EQUIPMENT_FILTERS", response.data);
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    filter_equipments: ({commit}, url) => {
        return new Promise((resolve, reject) => {
            apiClient.equipment.filter_equipments(url)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },
};