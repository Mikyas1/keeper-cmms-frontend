// import http from "@/resources/http";
import axios from "axios";

export default {

    logout: ({ commit }) => {
        commit("RESET");
        commit("account/RESET", null, { root: true });
        commit("reports/RESET", null, { root: true });
        commit("equipments/RESET", null, { root: true });
        commit("workorder/RESET", null, { root: true });
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

};