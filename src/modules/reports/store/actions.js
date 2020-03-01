import apiClient from "@/resources/apiClient";

export default {

    get_reports: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.reports.get_reports()
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_reports_with_url: ({commit}, url) => {
        return new Promise((resolve, reject) => {
            apiClient.reports.get_reports_with_url(url)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    search_reports: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.reports.search_reports(data)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    filter_reports: ({commit}, url) => {
        return new Promise((resolve, reject) => {
            apiClient.reports.filter_reports(url)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_open_reports: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.reports.get_open_reports()
            .then(response => {
                commit("SET_OPEN_REPORTS", response.data);
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    report_equipment: ({commit}, url) => {
        return new Promise((resolve, reject) => {
            apiClient.reports.report_equipment(url)
            .then(response => {
                commit("ADD_OPEN_REPORTS", response.data);
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    ignore_report: ({commit}, id) => {
        return new Promise((resolve, reject) => {
            apiClient.reports.ignore_report(id)
            .then(response => {
                commit("REMOVE_OPEN_REPORT", id);
                resolve( response.data );
            })
            .catch(e => {
                reject(e.response.data);
            })
        });
    },

};