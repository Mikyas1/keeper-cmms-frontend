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

    get_equipment_detail: ({ commit }, id) => {
        return new Promise((resolve, reject) => {
            apiClient.equipment.get_equipment_detail(id)
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

    get_production_line_detail: ({commit}, id) => {
        return new Promise((resolve, reject) => {
            apiClient.equipment.get_production_line_detail(id)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    assign_operator: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.equipment.assign_operator(data.data, data.id)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve(response);
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    remove_operator: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.equipment.remove_operator(data.data, data.id)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve(response);
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    equipment_operators: ({ commit }, id) => {
        return new Promise((resolve, reject) => {
            apiClient.equipment.equipment_operators(id)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_equipment_models: ({commit},) => {
        return new Promise((resolve, reject) => {
            apiClient.equipment.get_equipment_models()
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