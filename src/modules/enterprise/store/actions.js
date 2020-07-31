import apiClient from "@/resources/apiClient";

export default {

    department_activities: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.enterprise.department_activities()
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    department_detail: ({ commit }, id) => {
        return new Promise((resolve, reject) => {
            apiClient.enterprise.department_detail(id)
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