import apiClient from "@/resources/apiClient";

export default {
    
    get_buildings: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.get_buildings()
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_departments: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.get_departments()
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_locations: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.get_locations()
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