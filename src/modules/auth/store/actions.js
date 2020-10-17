// import http from "@/resources/http";
import apiClient from "@/resources/apiClient";
import axios from "axios";

export default {

    logout: ({ commit }) => {
        
        commit("RESET");
        commit("account/RESET", null, { root: true });
        commit("reports/RESET", null, { root: true });
        commit("equipments/RESET", null, { root: true });
        commit("workorder/RESET", null, { root: true });
        commit("enterprise/RESET", null, { root: true });
        commit("facility_admin/RESET", null, { root: true });

        return new Promise((resolve, reject) => {
            apiClient.auth.logout()
            .then(response => {
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    login: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            var baseURL =process.env.VUE_APP_API_URL;
            axios.post(baseURL + "account/login", data)
            .then(response => {
                commit("SET_TOKEN", response.data.token);
                commit("SET_USER", response.data.user);
                resolve( response.data.user );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_notifications: ({commit} ) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.get_notifications()
            .then(response => {
                commit("SET_NOTIFICATIONS", response.data);
                // commit("SET_WORKORDER_REQUESTE", response.data.workorder_requests)
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

};
