import apiClient from "@/resources/apiClient";

export default {

    report_current_workorders: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.system_report.report_current_workorders()
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    report_workorder_history: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.system_report.report_workorder_history(data)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_parts: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.system_report.get_parts()
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    report_workorder: ({commit}, id) => {
        return new Promise((resolve, reject) => {
            apiClient.system_report.report_workorder(id)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_managerial_report: ({commit}, data) => {
        return new Promise((resolve, reject) => {
            apiClient.system_report.monthly_and_annualy_report(data)
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